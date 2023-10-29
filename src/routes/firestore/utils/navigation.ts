import type { Topic } from '../appContext'

const BASE_PATH = '/firestore'

export const paths = {
  topics: (topicId?: Topic['id']) => {
    console.log('topicId', topicId)

    return [BASE_PATH, 'topics', topicId].join('/')
  },
}
