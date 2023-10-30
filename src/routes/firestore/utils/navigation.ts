import type { Person, Topic } from '../appContext'

const BASE_PATH = '/firestore'

export const paths = {
  persons: (personName?: Person['name']) =>
    [BASE_PATH, 'persons', personName].filter(Boolean).join('/'),

  topics: (topicName?: Topic['name']) => [BASE_PATH, 'topics', topicName].filter(Boolean).join('/'),
}
