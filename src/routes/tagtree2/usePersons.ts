import { getContext, setContext } from 'svelte'
import { writable } from 'svelte/store'
import type { Person, Trait } from './data'

export function setPersonsContext(persons: Person[], traits: Trait[]) {
  const personsStore = {
    ...writable(persons),

    findById(id: Person['id']) {
      return persons.find((p) => p.id === id)
    },
  }

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

    add(
      trait: Pick<Trait, 'kind' | 'nodeId' | 'personId'> & {
        body?: Trait['body']
        scale?: Trait['scale']
      }
    ) {
      traitsStore.update((traits) => [...traits, { body: '', scale: 0, ...trait }])
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
