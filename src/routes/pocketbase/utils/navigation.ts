import type { UserSelect } from '../types'

const BASE_PATH = '/pocketbase'

export const paths = {
  home: () => BASE_PATH,
  users: (id?: UserSelect['id']) => [BASE_PATH, 'users', id].filter(Boolean).join('/'),
}
