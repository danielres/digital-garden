<script lang="ts">
  import { useMachine, type Event, type State, type Transitions } from './fsm'

  function increment(state: State, event: Event, nextState: State, context: any) {
    context.count++
    return context
  }
  function log(state: State, event: Event, nextState: State, context: any) {
    console.log({ state, event, nextState, context })
    return context
  }

  type Context = {
    count: number
    message: string
  }

  const transitions = {
    start: {
      CLICK: {
        target: 'playing',
        actions: [log, increment, log],
      },
    },
    playing: {
      CLICK: { target: 'start', actions: [increment] },
    },
  } as const

  const initialContext = {
    count: 0,
    message: 'Initial Message',
  }

  const { state, context, send } = useMachine<Context>(transitions, 'start', initialContext)
</script>

{$state} - {JSON.stringify($context, null, 2)}
<button on:click={() => send({ type: 'CLICK' })}>CLICK</button>
