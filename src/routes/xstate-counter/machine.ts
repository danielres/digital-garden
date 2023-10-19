import { assign, createMachine } from 'xstate'

export const counterMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgKwBdcA3MAYgEEBhAFQEkA1BlgUQG0ADAF1EoAA4B7WLioT8okAA9EAJgDMANhIqNAFjUBGAQbVqVKgJwAOKwBoQAT0Smr2gOy6VAVgECNArws3AF9g+zQsPEJSShp6ABEeZnYuXkERJBBJaVl5TOUEcy0VNwErA3KNL383EvsnQrc3EgM3Cq8dXQsfANDwjBwCYhJY2jo2ADkmdIVsmVw5BQKAWi9mjQ0DXV1jNQtPa116xAM1kl0DLZUrNo6-XSs+kAjB6JHMKjHE6eFZqXnFvkTgZihYNBY1F5TEY3F5dG5jghTs0LlcbqcVPcvKEwiB8BIIHAFC8osQ-jkFnlQCsjF4SBstjsTPtLFYjo5EKUSGUrF4MSDwSotk8SUNSOQPnFyQCqUpEPpXAILlUbgJriptoiSlorKZDG41Lp-PpsbjRW9RmBpbklvKERzGjq9a1DcbITjgkA */
  predictableActionArguments: true,
  initial: 'active',
  context: {
    count: 0,
  },
  states: {
    inactive: {
      on: {
        ACTIVATE: {
          target: 'active',
        },
      },
    },
    active: {
      on: {
        DEACTIVATE: {
          target: 'inactive',
        },
        INC: {
          actions: assign({ count: (context) => context.count + 1 }),
        },
        DEC: {
          actions: assign({ count: (context) => context.count - 1 }),
        },
      },
    },
  },
})
