export const inventoryFSMConfig = {
  id: "inventory",
  initial: "closed",
  states: {
    closed: {
      on: { OPEN: "opening" },
    },
    opening: {
      on: { COMPLETE: "open" },
    },
    open: {
      on: {
        CLOSE: "closing",
        SELECT_ITEM: "selecting",
      },
    },
    selecting: {
      on: {
        CONFIRM: "open",
        CANCEL: "open",
      },
    },
    closing: {
      on: { COMPLETE: "closed" },
    },
  },
};

export const combatFSMConfig = {
  id: "combat",
  initial: "peaceful",
  states: {
    peaceful: {
      on: { ENGAGE: "initiating" },
    },
    initiating: {
      on: { READY: "combat" },
    },
    combat: {
      on: {
        PLAYER_TURN: "playerTurn",
        ENEMY_TURN: "enemyTurn",
        FLEE: "fleeing",
        VICTORY: "victory",
        DEFEAT: "defeat",
      },
    },
    playerTurn: {
      on: { END_TURN: "combat" },
    },
    enemyTurn: {
      on: { END_TURN: "combat" },
    },
    fleeing: {
      on: {
        SUCCESS: "peaceful",
        FAIL: "combat",
      },
    },
    victory: {
      on: { END: "peaceful" },
    },
    defeat: {
      on: { RESPAWN: "peaceful" },
    },
  },
};
