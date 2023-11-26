import type { RecordModel } from 'pocketbase'

export function isUserSelect(object: RecordModel): object is UserSelect {
  return object.collectionName === 'users'
}

export const traitTargetCollectionNames = ['users', 'topics'] as const
export const collectionNames = [...traitTargetCollectionNames, 'traits'] as const

export type TraitTargetCollectionName = (typeof traitTargetCollectionNames)[number]
export type CollectionName = (typeof collectionNames)[number]

export type UserInsert = {
  username: string
  slug: string
  email: string
  password: string
  passwordConfirm: string
}

export type UserSelect = {
  avatar: string
  collectionId: '_pb_users_auth_'
  collectionName: 'users'
  created: Date
  emailVisibility: boolean
  id: string
  name: string
  slug: string
  updated: Date
  username: string
  verified: boolean
  desc: string
}

export type UserNormalized = Omit<UserSelect, 'username' | 'avatar'> & {
  label: UserSelect['username']
  image: UserSelect['avatar']
  email?: UserCurrent['email']
}

export type UserCurrent = UserSelect & {
  email: string
}

export type TopicSelect = {
  collectionId: '_pb_topics_'
  collectionName: 'topics'
  created: Date
  id: string
  label: string
  slug: string
  updated: Date
  desc: string
}

type TraitLevels = Record<string, number>

export type TraitSelect = {
  id: string
  collectionId: string
  collectionName: 'traits'
  created: Date
  updated: Date
  desc: string
  levels: TraitLevels
  topic: TopicSelect['id']
  expand?: { user?: UserSelect; topic?: TopicSelect }
}

export type TraitExpandedWithTopic = {
  id: string
  desc: string
  levels: TraitLevels
  expand: {
    topic: {
      id: string
      label: string
      slug: string
      collectionName: 'topics'
    }
  }
}

export type TraitGeneric = {
  id: string
  desc: string
  levels: TraitLevels
  target: UserNormalized | TopicSelect
}
