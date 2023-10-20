import { get, writable, type Writable } from 'svelte/store'

export type Event<T extends string> = { type: T }

export type Transitions<State extends string, EventType extends string, Context> = {
  [key in State]: {
    [key in EventType]?: {
      target: State
      actions?: readonly ((
        current: State,
        event: Event<EventType>,
        next: State,
        context: Context
      ) => Context)[]
    }
  }
}

export function useMachine<State extends string, EventType extends string, Context>(
  transitions: Transitions<State, EventType, Context>,
  initial: State,
  initialContext: Context
) {
  const state = writable(initial)
  const context = writable(initialContext)

  function send(event: Event<EventType>) {
    const currentContext = get(context)
    const newTransition = transition<State, EventType, Context>(
      state,
      event,
      transitions,
      currentContext
    )
    context.set(newTransition.context)
    state.set(newTransition.state)
  }

  return { state, context, send }
}

function transition<State extends string, EventType extends string, Context>(
  state: Writable<State>,
  event: Event<EventType>,
  transitions: Transitions<State, EventType, Context>,
  currentContext: Context
): { state: State; context: Context } {
  const currentState = get(state)
  const eventType = event.type as EventType
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
