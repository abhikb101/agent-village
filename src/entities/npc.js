import defaultNPC from "../data/defaults/npc.json";

export function createNPC(k, npcData, dialogueSystem) {
  const x = k.width() * npcData.relativeX;
  const y = k.height() * npcData.relativeY;
  const size = Math.min(k.width(), k.height()) * 0.05;
  const interactionRange =
    Math.min(k.width(), k.height()) *
    (npcData.interactionRange || defaultNPC.interactionRange);

  return k.add([
    k.rect(size, size),
    k.pos(x, y),
    k.color(k.rgb(npcData.color[0], npcData.color[1], npcData.color[2])),
    k.area(),
    k.body({ isStatic: true }),
    "npc",
    {
      name: npcData.name,
      dialogueTree: npcData.dialogueTree,
      interactionRange,
      interact() {
        console.log("Interacting with NPC:", this.name, this.dialogueTree);
        if (this.dialogueTree && this.dialogueTree.start) {
          dialogueSystem.show(this, "start");
        } else {
          console.error("DialogueTree missing for NPC:", this.name);
        }
      },
    },
  ]);
}
