import type { Person, Topic, Trait } from '../appContext'

const BASE_PATH = '/firestore'

export const paths = {
  persons: (personName?: Person['name']) =>
    [BASE_PATH, 'persons', personName].filter(Boolean).join('/'),

  topics: (topicName?: Topic['name']) => [BASE_PATH, 'topics', topicName].filter(Boolean).join('/'),

  traits: (traitId?: Trait['id']) => [BASE_PATH, 'traits', traitId].filter(Boolean).join('/'),
}
