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

  const traitsStore = {
    ...writable(traits),

    remove({ kind, personId, nodeId }: Pick<Trait, 'kind' | 'personId' | 'nodeId'>) {
      traitsStore.update((traits) =>
        traits.filter((t) => !(t.kind === kind && t.personId === personId && t.nodeId === nodeId))
      )
    },

    updateScale(
      { kind, personId, nodeId }: Pick<Trait, 'kind' | 'personId' | 'nodeId'>,
      scale: number
    ) {
      traitsStore.update((traits) =>
        traits.map((t) => {
          if (t.kind === kind && t.personId === personId && t.nodeId === nodeId) {
            return { ...t, scale }
          }
          return t
        })
      )
    },
  }

  return setContext('persons', {
    persons: personsStore,
    traits: traitsStore,
  })
}

export function getPersonsContext(): ReturnType<typeof setPersonsContext> {
  return getContext('persons')
}
