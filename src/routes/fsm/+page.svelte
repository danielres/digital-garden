<script lang="ts">
  import { useMachine, type Event } from './fsm'

  function increment(state: State, event: Event<EventType>, nextState: State, context: any) {
    context.count++
    return context
  }

  function log(state: State, event: Event<EventType>, nextState: State, context: any) {
    console.log({ state, event, nextState, context })
    return context
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

  type State = keyof typeof transitions
  type EventType = keyof typeof transitions[State]
  type Context = typeof initialContext

  const { state, context, send } = useMachine<State, EventType, Context>(
    transitions,
    'start',
    initialContext
  )
</script>

<div class="max-w-2xl mx-auto py-16 grid gap-4 justify-items-center">
  <div class="grid grid-cols-[auto_1fr] gap-4">
    <dl class="contents">
      <dt>state:</dt>
      <dd>{$state}</dd>
    </dl>
    <dl class="contents">
      <dt>Context:</dt>
      <dd>{JSON.stringify($context, null, 2)}</dd>
    </dl>
  </div>

  <button class="btn variant-ghost" on:click={() => send({ type: 'CLICK' })}>CLICK</button>
</div>

<style lang="postcss">
  dt {
    font-weight: bold;
  }
  dd {
    font-family: monospace;
  }
</style>
