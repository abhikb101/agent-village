export function createNPC(k, npcData, dialogueSystem) {
  console.log("Creating NPC with data:", npcData);

  return k.add([
    k.rect(32, 32),
    k.pos(npcData.x, npcData.y),
    k.color(k.rgb(npcData.color[0], npcData.color[1], npcData.color[2])),
    k.area(),
    k.body({ isStatic: true }),
    "npc",
    {
      name: npcData.name,
      dialogueTree: npcData.dialogueTree,
      interactionRange: 50,
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
