import { assign, createMachine, type EventObject } from 'xstate'

export const counterMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgKwBdcA3MAYgHkA5AbQAYBdRUABwHtYuKn3zcQAD0QBaAMwBWEvICMcgGxKAnDIAcStgCY22gDQgAnogDsGkktX25c-fO2HVAX3em0WPIVKUNPQMAGIh7FxIIPyCwqJRkggyACwk+to6ySpZ2qpOKqYWCCr6ijLlyfpZGpYyBjKe3hg4BMQkgbQkmHwArvhU+FB0AJJMAMIRYjFCuCJiifpySmkyqhpy8mqWyU4m5oj6qjK26smqydrr+ov6lo0gPi3+7ZhUnd19A0MAIgCiE5wpgIZnMEogZJZSo5DNtnOkjrVCgcjiclGcLlcbnd7vg+BA4GJHn5iEDYrN4qBElI9JYSNpXLpsrp6ckkQgpNpbGpFq5VIctJYlEp7kTWqRyK8gqSQRSJNI5DZ6ekhXILkoWWz9EpSuUKlVNLV6iLmsSApLaNK4vMDmw2GlkrVIXVVfJFmyhal1c42JorskjB4vA8TWKXm8wF1ev0CFBLeTrQgqpyqo7vS6nHJNbaSKpBfSUjtnM7PJ4gA */
  predictableActionArguments: true,
  context: {
    count: 0,
  },
  initial: 'active',
  states: {
    inactive: {
      on: {
        ON: {
          target: 'active',
        },
      },
    },

    active: {
      initial: 'counting',

      on: {
        OFF: 'inactive',
      },

      states: {
        counting: {
          on: {
            INC: {
              target: 'counting',
              internal: true,
              actions: assign({
                count: (context, event: EventObject & { step: number }) =>
                  context.count + event.step,
              }),
            },

            DEC: {
              target: 'counting',
              internal: true,
              actions: assign({
                count: (context, event: EventObject & { step: number }) =>
                  context.count - event.step,
              }),
            },
          },
        },
      },
    },
  },
})
