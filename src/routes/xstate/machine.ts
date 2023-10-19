import { createMachine } from 'xstate'

// This machine is completely decoupled from Svelte
export const nodeTreeMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QFsD2EwDo0DcwGIBhAeQAUBNAbQAYBdRUAB1VgEsAXV1AOwZAA9EARgCcADkwiA7CKEA2AEwBWagsXUhAGhABPRAuoS5AFhEBmatVMiFCqVLMBfR9rQZsqPPgCCAEV809EggzGycPHyCCEIqmGZyZolyQnbi0tp6CErGZnH2UkpCZgrmKQrOruhYuAS+AEreAOIABADKACrede2BfKEcXLzBUQpCxphyUjliUmKmCsZzZhmIALRjE4pmKtRySkpSQlZSFSBuWADGqIw6+ACyxABqAKK9wf3hQ6BRxkKYDtkzFM5KUhGIFCsEPlMGIYuJjLMFECxE4XGcqpgrjcfP43kwWAMIsNEGZjOM5FYlOJqIliiplrp9CZ-olLIVqA4xCIlKdzpgAIYQCD3J6vOh9AmfSLCWaSGTyZSqdRaRkIPZSTDGajSbaGBRiOYiXkYwXCkgUPEhSWDaVQ5lKPYc2FmcGHYyQlQasRyBJHCwqClyY3uU2YABOYEFt1IAElCABpZqkLrPAByPXF72tRO+iFMuSUQJMtMmIh9kPVmu1UiRCRm5mMwawodgAAtUAB3ZoAM1YYAANmbiKmAGIxup3S0fG3ErLFTB2QscpEHaQiD0JTBKZS2RY02lGtF83CsbhQfD1JptdpkKfZr4CfRgmGTbXeqkc0QMzLblmFURamWsL2E2mLXLcl4tB0XQZkE+JhDOubREIMR5JMCzbnsSgzJCozjAUvxqGY8g5DYYigViOinuekHXrembwYSD5RH6uSyLC2EcrsOS4TYcSwnsCxyLCdgIs4aLcFU8DBOcEoITmj4IKscgLiYDrKBYwmwrCkLrBokhiJhUjcVSSSgTUclMbaxgQqqIjjDMupiMuhbCeUR4YpRllSrOsjjEU4IWLICxSJMkLbAWuxzGC2QiNQhSopUIZCt5iGKcUIiagcyTxBxMWQgiKkGEiKEWIsohBh5yUQOGkYQJkjE+UhQIasY2VFMJMT5aqDqZWo4LOcJyQJIl6LVZgbadj2faDqlClRD6+HxAsFh2AUCweoc-xuYN3ryIk5meNRc3MXmxEwgcojepMLpgh6mXZDMsI0vZWqHBR4HHVm8mndEowSL82FzLYCQaLxCiYFYQVgpMoUlI24lAA */
    predictableActionArguments: true,
    id: 'mode',
    initial: 'move',

    states: {
      move: {
        on: {
          COPY: 'copy',
          ADD: 'add.ready',
        },
      },

      copy: {
        on: {
          MOVE: 'move',
          ADD: 'add',
          'DRAG START': 'copying',
        },
      },

      add: {
        on: {
          MOVE: 'move',
          COPY: 'copy',
        },

        states: {
          ready: {
            on: {
              'SET PARENT': { target: 'show field', actions: ['setParent'] },
            },
          },

          'show field': {
            on: {
              CONFIRM: 'ready',
            },
          },
        },

        initial: 'ready',
      },

      moving: {
        on: {
          'DRAG STOP': 'move',
        },
      },

      copying: {
        on: {
          'DRAG STOP': 'copy',
        },
      },
    },
  },
  {
    actions: {
      setParent: (context, event) => console.log('set parent', context, event),
    },
  }
)
