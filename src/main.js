import kaboom from "kaboom";
import { gameConfig } from "./config/gameConfig";

// Initialize kaboom
const k = kaboom({
  width: gameConfig.width,
  height: gameConfig.height,
  scale: 1,
  debug: true,
  fullscreen: true,
  stretch: true,
});

// Add after kaboom initialization
window.addEventListener("resize", () => {
  k.width = window.innerWidth;
  k.height = window.innerHeight;
});

// Load scenes
import { loadVillageScene } from "./scenes/village";

// Start with village scene
loadVillageScene(k);
