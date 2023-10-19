import { createMachine } from 'xstate'

// This machine is completely decoupled from Svelte
export const toggleMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCWE2AxAIIDCZAogDKUBKJAKpQNoAMAuoqAA6qx5keVADtuIAB6IALADYA7DgCsADiUBOaaoBM6+UoCMsgDQgAnogDMObbLbT5mpbOnbt0y21kBfb6bQY2DgAZgCumJgABLA8YJBEACKUVLQMzOxcSCB8AkKi4lII2paKsuoGqupednoqlqYWRepKyvIqbCryutpqspa+-uhYuAAWAIaYwdGx8eQp9EysnOI5gsJiWYXabC3OluoqsirSBj0uJuaIBuraOCfS6pZubJ5KSl4DIAHDOOOT03EIIlkjQFullllVnkNqBCnJ1DgDGxHupHio9A56pcECoDDgnroDPIkfJLNI2PJpJ9vkEwhEAfEAMqMADyAAUMit+Gt8psripbgYPNohZY+rJ3koGohDjgqlohWwKgptPJ5L4-CARKgIHBxDSwFzcusCogALQXRpm444LzuNzqOxvJUqalDIIEbBGnkwyRWck4OwKOpPYmWIXSnGKLwaOr29qSt2BXB0qIxQHe6GmhCuSN6OWWOptaS4+wOpM-P5TdOQTMmvkIPqKJRdKp9VVqvSRgxiwNaNQl0uaaRUjVAA */
    predictableActionArguments: true,
    id: 'toggle',
    initial: 'idle',

    states: {
      idle: {
        on: {
          ACCELERATE: 'half speed',
        },
      },

      'full speed': {
        on: {
          DECELERATE: {
            target: 'half speed',
            actions: ['log'],
          },
          STOP: 'idle',
        },
      },

      'half speed': {
        on: {
          ACCELERATE: 'full speed',
          DECELERATE: 'idle',
        },
      },
    },
  },
  {
    actions: {
      log: (context, event) => console.log('log', event),
    },
  }
)
