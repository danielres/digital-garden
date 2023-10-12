import { getContext, setContext } from 'svelte'
import { writable } from 'svelte/store'

export type Person = { id: string; name: string }
export type Trait = {
  kind: string
  personId: string
  nodeId: string
  body: string
  scale: number
}

export function setPersonsContext(persons: Person[], traits: Trait[]) {
  const personsStore = writable(persons)
  const traitsStore = writable(traits)

  return setContext('persons', {
    persons: personsStore,
    traits: traitsStore,
  })
}

export function getPersonsContext(): ReturnType<typeof setPersonsContext> {
  return getContext('persons')
}
