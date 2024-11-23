import { BaseFSMSystem } from "../fsm/BaseFSMSystem";
import { dialogueFSMConfig } from "../fsm/configs/dialogueFSM";

export class DialogueBox extends BaseFSMSystem {
  constructor(k) {
    super(dialogueFSMConfig, { debug: true });
    this.k = k;
    this.currentDialogue = null;
    this.currentNPC = null;
    this.dialogueBox = null;
    this.options = [];
    this.pendingNavigation = null;

    // Add entry action handler
    this.service.subscribe((state) => {
      if (state.value === "idle" && this.pendingNavigation) {
        const { npc, dialogueId } = this.pendingNavigation;
        this.pendingNavigation = null;
        setTimeout(() => this.show(npc, dialogueId), 0);
      }
    });
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
      this.currentDialogue = null;
      this.currentNPC = null;

      // Transition to idle state
      this.send("CLEANUP");
    }
  }

  show(npc, dialogueId) {
    // Only allow showing dialog from idle or transitioning states
    const currentState = this.getState();
    if (!["idle", "transitioning"].includes(currentState)) {
      console.warn("Cannot show dialogue in current state:", currentState);
      return;
    }

    // Clean up existing dialogue if any
    if (this.dialogueBox) {
      this.destroy();
    }

    this.currentNPC = npc;
    this.currentDialogue = npc.dialogueTree[dialogueId];

    if (!this.currentDialogue) {
      console.error(
        `Dialogue ID "${dialogueId}" not found in NPC's dialogue tree`
      );
      this.send("ERROR");
      return;
    }

    // Send SHOW event to state machine
    this.send("SHOW");

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

      // Click handler with state management
      optionBg.onClick(() => {
        if (this.getState() !== "showing") {
          console.warn(
            "Cannot handle click in current state:",
            this.getState()
          );
          return;
        }

        if (option.nextId === "end") {
          this.send("END");
          this.destroy();
        } else {
          // Store the navigation target
          this.pendingNavigation = {
            npc: this.currentNPC,
            dialogueId: option.nextId,
          };

          // Initiate transition
          this.send("NAVIGATE");
          this.destroy();
          // Navigation will continue in idle state's entry action
        }
      });

      this.options.push(optionBg);
      this.options.push(optionText);
    });

    // Add ESC to close dialogue
    this.k.onKeyPress("escape", () => {
      if (this.isActive()) {
        this.send("END");
        this.destroy();
      }
    });
  }

  isActive() {
    return (
      this.dialogueBox !== null &&
      ["showing", "transitioning"].includes(this.getState())
    );
  }
}
