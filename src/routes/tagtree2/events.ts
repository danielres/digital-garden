import type { EventDispatcher } from 'svelte'
import type { Node, Person } from './data'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dispatch = EventDispatcher<any>

export function personClicked(dispatch: Dispatch, person: Person) {
  dispatch('personClicked', person)
}

export function nodeClicked(dispatch: Dispatch, nodeId: Node['id']) {
  dispatch('nodeClicked', nodeId)
}
