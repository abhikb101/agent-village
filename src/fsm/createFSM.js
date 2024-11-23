import { createMachine, interpret } from "@xstate/fsm";

export function createFSM(config, options = {}) {
  const machine = createMachine(config);
  const service = interpret(machine);

  if (options.debug) {
    service.subscribe((state) => {
      console.log(`[${config.id}] State:`, state.value);
    });
  }

  service.start();
  return service;
}
