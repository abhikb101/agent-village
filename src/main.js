import kaboom from "kaboom";

// Initialize kaboom
const k = kaboom({
  width: 800,
  height: 600,
  scale: 1,
  debug: true,
});

// Load scenes
import { loadVillageScene } from "./scenes/village";

// Start with village scene
loadVillageScene(k);
