import { createPlayer } from "../entities/player";
import { createNPC } from "../entities/npc";
import { DialogueBox } from "../ui/DialogueBox";
import npcsData from "../data/npcs.json";
import { getBuildingsConfig } from "../data/buildings";
import { createBuilding } from "../entities/building";
import defaultDialogueTree from "../data/defaults/dialogueTree.json";
import defaultNPC from "../data/defaults/npc.json";

export function loadVillageScene(k) {
  k.scene("village", () => {
    // Debug log to check data loading
    console.log("Loaded NPCs data:", npcsData);

    // Initialize dialogue box as a class instance
    const dialogueSystem = new DialogueBox(k);

    // Add background
    k.add([k.rect(k.width(), k.height()), k.color(144, 238, 144), k.pos(0, 0)]);

    // Create buildings
    const buildingsConfig = getBuildingsConfig(k.width(), k.height());
    const gameBuildings = buildingsConfig.map((buildingData) =>
      createBuilding(k, buildingData)
    );

    // Create player
    const player = createPlayer(k);

    // Create NPCs with error checking
    const npcs = npcsData.map((npcData) => {
      // Apply default dialogue tree if missing
      if (!npcData.dialogueTree) {
        console.warn(
          `Missing dialogueTree for NPC: ${npcData.name}, using default`
        );
        npcData.dialogueTree = defaultDialogueTree;
      }

      // Ensure relativeX/Y exist
      if (typeof npcData.relativeX === "undefined") {
        console.warn(
          `Missing relativeX for NPC ${
            npcData.name || defaultNPC.name
          }, using default`
        );
        npcData.relativeX = defaultNPC.relativeX;
      }

      if (typeof npcData.relativeY === "undefined") {
        console.warn(
          `Missing relativeY for NPC ${
            npcData.name || defaultNPC.name
          }, using default`
        );
        npcData.relativeY = defaultNPC.relativeY;
      }

      // Merge with default NPC config
      npcData = { ...defaultNPC, ...npcData };

      return createNPC(k, npcData, dialogueSystem);
    });

    // Create interaction prompt
    const prompt = k.add([
      k.text("Press X to talk", { size: 16 }),
      k.pos(0, 0),
      k.color(255, 255, 255),
      k.opacity(0),
      k.fixed(),
      k.z(100),
    ]);

    // Add building labels with adjusted positioning
    gameBuildings.forEach((building) => {
      k.add([
        k.text(building.name, {
          size: Math.floor(k.width() * 0.015), // Dynamic text size
        }),
        k.pos(
          building.pos.x + building.width * 0.1, // 10% padding from building edge
          building.pos.y - k.height() * 0.03 // 3% of screen height above building
        ),
        k.color(0, 0, 0),
      ]);
    });

    // Update loop
    k.onUpdate(() => {
      if (!dialogueSystem.isActive()) {
        let nearbyNPC = null;

        npcs.forEach((npc) => {
          const dist = npc.pos.dist(player.pos);
          if (dist < npc.interactionRange) {
            nearbyNPC = npc;
          }
        });

        if (nearbyNPC) {
          prompt.opacity = 1;
          prompt.pos = k.vec2(nearbyNPC.pos.x, nearbyNPC.pos.y - 40);

          if (k.isKeyPressed("x")) {
            nearbyNPC.interact();
            prompt.opacity = 0;
          }
        } else {
          prompt.opacity = 0;
        }
      }
    });

    // Add key handler for ESC
    k.onKeyPress("escape", () => {
      if (dialogueSystem.isActive()) {
        dialogueSystem.destroy();
      }
    });

    // Clean up
    k.onSceneLeave(() => {
      dialogueSystem.destroy();
    });
  });

  k.go("village");
}
