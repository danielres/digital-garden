import { writable } from 'svelte/store'

export type EventTypes = 'CLICK'
export type Event = { type: EventTypes }
export type State = 'start' | 'playing'

export type Transitions = {
  [key in State]: {
    [key in Event['type']]?: {
      target: State
      actions?: readonly ((state: State, event: Event) => void)[]
    }
  }
}

export function useMachine(transitions: Transitions, initial: State) {
  const state = writable(initial)

  function send(event: Event) {
    state.update((state) => transition(state, event, transitions))
  }

  return { state, send }
}

function transition(state: State, event: Event, transitions: Transitions): State {
  const eventType = event.type as keyof typeof transitions[typeof state]
  const stateKey = transitions[state][eventType]

  if (!stateKey) return state

  if ('actions' in stateKey) stateKey.actions?.forEach((fn) => fn(state, event))

  return stateKey.target ?? state
}
