<script lang="ts">
  import { useMachine, type Event, type State, type Transitions } from './fsm'

  const transitions: Transitions = {
    start: {
      CLICK: {
        target: 'playing',
        actions: [
          (state: State, event: Event) => {
            console.log('FOO', state, event)
          },
        ],
      },
    },
    playing: {
      CLICK: { target: 'start' },
    },
  } as const

  const { state, send } = useMachine(transitions, 'start')
</script>

{$state}
<button on:click={() => send({ type: 'CLICK' })}>CLICK</button>
