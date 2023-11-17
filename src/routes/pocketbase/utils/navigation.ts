import type { TopicSelect, UserSelect } from '../types'

const BASE_PATH = '/pocketbase'

export const paths = {
  home: () => BASE_PATH,
  users: (slug?: UserSelect['slug']) => [BASE_PATH, 'users', slug].filter(Boolean).join('/'),
  topics: (slug?: TopicSelect['slug']) => [BASE_PATH, 'topics', slug].filter(Boolean).join('/'),
}
