import { createPlayer } from "../entities/player";
import { createNPC } from "../entities/npc";
import { DialogueBox } from "../ui/DialogueBox";
import npcsData from "../data/npcs.json";

export function loadVillageScene(k) {
  k.scene("village", () => {
    // Debug log to check data loading
    console.log("Loaded NPCs data:", npcsData);

    // Initialize dialogue box as a class instance
    const dialogueSystem = new DialogueBox(k);

    // Add background
    k.add([k.rect(k.width(), k.height()), k.color(144, 238, 144), k.pos(0, 0)]);

    // Create player
    const player = createPlayer(k);

    // Create NPCs with error checking
    const npcs = npcsData.map((npcData) => {
      if (!npcData.dialogueTree) {
        console.error("Missing dialogueTree for NPC:", npcData.name);
        // Provide default dialogue tree if missing
        npcData.dialogueTree = {
          start: {
            text: "Hello there!",
            options: [
              {
                text: "Goodbye",
                nextId: "end",
              },
            ],
          },
          end: {
            text: "Farewell!",
            options: [],
          },
        };
      }
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
