export const dialogueFSMConfig = {
  id: "dialogue",
  initial: "idle",
  states: {
    idle: {
      on: {
        SHOW: "showing",
      },
    },
    showing: {
      on: {
        NAVIGATE: "transitioning",
        END: "ending",
      },
    },
    transitioning: {
      on: {
        CLEANUP: "idle",
        ERROR: "error",
      },
    },
    ending: {
      on: {
        CLEANUP: "idle",
      },
    },
    error: {
      on: {
        RETRY: "idle",
      },
    },
  },
};
