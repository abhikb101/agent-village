const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Player class
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.speed = 3;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move(keys) {
    if (keys.ArrowUp) this.y -= this.speed;
    if (keys.ArrowDown) this.y += this.speed;
    if (keys.ArrowLeft) this.x -= this.speed;
    if (keys.ArrowRight) this.x += this.speed;

    // Keep player in bounds
    this.x = Math.max(0, Math.min(canvas.width - this.width, this.x));
    this.y = Math.max(0, Math.min(canvas.height - this.height, this.y));
  }
}

// NPC class
class NPC {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// Game state
const player = new Player(400, 300);
const npcs = [
  new NPC(200, 200, "red"),
  new NPC(600, 400, "green"),
  new NPC(300, 450, "yellow"),
];

// Input handling
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

window.addEventListener("keydown", (e) => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = false;
  }
});

// Game loop
function gameLoop() {
  // Clear canvas
  ctx.fillStyle = "#90EE90"; // Light green background for grass
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Update player position
  player.move(keys);

  // Draw NPCs
  npcs.forEach((npc) => npc.draw());

  // Draw player
  player.draw();

  // Continue game loop
  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
