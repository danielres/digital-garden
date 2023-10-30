import type { Topic } from '../appContext'

const BASE_PATH = '/firestore'

export const paths = {
  topics: (topicId?: Topic['id']) => {
    return [BASE_PATH, 'topics', topicId].filter(Boolean).join('/')
  },
}
