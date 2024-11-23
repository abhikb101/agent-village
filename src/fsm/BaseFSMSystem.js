import { createFSM } from "./createFSM";

export class BaseFSMSystem {
  constructor(fsmConfig, options = {}) {
    this.service = createFSM(fsmConfig, options);
    this.pendingActions = new Map();
  }

  send(event) {
    this.service.send(event);
  }

  getState() {
    return this.service.state.value;
  }

  isInState(state) {
    return this.service.state.value === state;
  }

  destroy() {
    this.service.stop();
  }
}
