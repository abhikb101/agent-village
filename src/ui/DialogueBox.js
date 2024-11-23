export class DialogueBox {
  constructor(k) {
    this.k = k;
    this.currentDialogue = null;
    this.currentNPC = null;
    this.dialogueBox = null;
    this.options = [];
    this.isProcessing = false;
  }

  destroy() {
    if (this.dialogueBox) {
      // Destroy all dialogue-related elements
      const dialogueElements = this.k.get("dialogue");
      dialogueElements.forEach((element) => {
        element.destroy();
      });
      this.dialogueBox = null;
      this.options = [];
      this.isProcessing = false;
      this.currentDialogue = null;
      this.currentNPC = null;
    }
  }

  show(npc, dialogueId) {
    console.log("Showing dialogue:", dialogueId, npc.dialogueTree[dialogueId]); // Debug log

    this.destroy();

    this.currentNPC = npc;
    this.currentDialogue = npc.dialogueTree[dialogueId];

    // Create dialogue box background
    this.dialogueBox = this.k.add([
      this.k.rect(600, 200),
      this.k.pos(this.k.center().x - 300, this.k.height() - 250),
      this.k.color(0, 0, 0),
      this.k.opacity(0.8),
      this.k.fixed(),
      this.k.z(100),
      "dialogue",
    ]);

    // Add NPC name
    this.k.add([
      this.k.text(npc.name, { size: 20 }),
      this.k.pos(this.k.center().x - 280, this.k.height() - 240),
      this.k.color(255, 255, 0),
      this.k.fixed(),
      this.k.z(100),
      "dialogue",
    ]);

    // Add dialogue text
    this.k.add([
      this.k.text(this.currentDialogue.text, { size: 16, width: 560 }),
      this.k.pos(this.k.center().x - 280, this.k.height() - 200),
      this.k.color(255, 255, 255),
      this.k.fixed(),
      this.k.z(100),
      "dialogue",
    ]);

    // Add options
    this.currentDialogue.options.forEach((option, index) => {
      // Option background
      const optionBg = this.k.add([
        this.k.rect(560, 30),
        this.k.pos(this.k.center().x - 280, this.k.height() - 140 + index * 35),
        this.k.color(100, 100, 100),
        this.k.opacity(0.5),
        this.k.area({ cursor: "pointer" }),
        this.k.fixed(),
        this.k.z(100),
        "dialogue",
      ]);

      // Option text
      const optionText = this.k.add([
        this.k.text(option.text, { size: 14 }),
        this.k.pos(this.k.center().x - 270, this.k.height() - 135 + index * 35),
        this.k.color(255, 255, 255),
        this.k.fixed(),
        this.k.z(101),
        "dialogue",
      ]);

      // Hover effects
      optionBg.onHover(() => {
        optionBg.color = this.k.rgb(150, 150, 150);
      });

      optionBg.onHoverEnd(() => {
        optionBg.color = this.k.rgb(100, 100, 100);
      });

      // Click handler
      optionBg.onClick(() => {
        console.log("Clicked option:", option.nextId); // Debug log
        if (option.nextId === "end") {
          this.destroy();
        } else {
          this.show(this.currentNPC, option.nextId);
        }
      });

      this.options.push(optionBg);
      this.options.push(optionText);
    });

    // Add ESC to close dialogue
    this.k.onKeyPress("escape", () => {
      if (this.isActive()) {
        this.destroy();
      }
    });
  }

  isActive() {
    return this.dialogueBox !== null;
  }
}
