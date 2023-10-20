import { get, writable, type Writable } from 'svelte/store'

export type EventTypes = 'CLICK'
export type Event = { type: EventTypes }
export type State = 'start' | 'playing'

export type Transitions<Context> = {
  [key in State]: {
    [key in Event['type']]?: {
      target: State
      actions?: readonly ((
        current: State,
        event: Event,
        next: State,
        context: Context
      ) => Context)[]
    }
  }
}

export function useMachine<Context>(
  transitions: Transitions<Context>,
  initial: State,
  initialContext: Context
) {
  const state = writable(initial)
  const context = writable(initialContext)

  function send(event: Event) {
    const currentContext = get(context)
    const newTransition = transition<Context>(state, event, transitions, currentContext)
    context.set(newTransition.context)
    state.set(newTransition.state)
  }

  return { state, context, send }
}

function transition<Context>(
  state: Writable<State>,
  event: Event,
  transitions: Transitions<Context>,
  currentContext: Context
): { state: State; context: Context } {
  const currentState = get(state)
  const eventType = event.type as keyof typeof transitions[typeof currentState]
  const stateKey = transitions[currentState][eventType]

  if (!stateKey) return { state: currentState, context: currentContext }

  let updatedContext = currentContext

  if ('actions' in stateKey) {
    for (const action of stateKey.actions || []) {
      updatedContext = action(currentState, event, stateKey.target ?? currentState, updatedContext)
    }
  }

  return {
    state: stateKey.target ?? currentState,
    context: updatedContext,
  }
}
