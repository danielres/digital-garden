import type PocketBase from 'pocketbase'
import type { UserInsert, UserSelect } from '../types'

export function makeAuth(pb: PocketBase) {
  return {
    admin: {
      signin: async (email: string, password: string) => {
        await pb.admins.authWithPassword(email, password)
      },
    },

    signin: async (email: string, password: string) => {
      await pb.collection('users').authWithPassword(email, password)
    },

    signup: (values: UserInsert): Promise<UserSelect> => {
      return pb.collection<UserInsert>('users').create(values)
    },

    signout: () => {
      pb.authStore.clear()
    },
  }
}
