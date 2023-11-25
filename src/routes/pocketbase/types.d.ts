export function isUserSelect(item: TraitItemSelect): item is UserSelect {
  return item.collectionName === 'users'
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

export type TraitSelect = {
  id: string
  collectionId: string
  collectionName: 'traits'
  created: Date
  updated: Date
  itemId: string
  itemType: TraitTargetCollectionName
  desc: string
  level: '0' | '1' | '2' | '3' | '4' | '5'
  kind: string
  topic: TopicSelect['id']
  expand?: { user?: UserSelect; topic?: TopicSelect }
}

export type TraitItemSelect = Pick<
  UserSelect,
  'id' | 'collectionName' | 'avatar' | 'username' | 'slug'
>

export type TraitExpandedWithTopic = {
  id: string
  desc: string
  level: string
  kind: string
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
  level: string
  kind: string
  target: UserNormalized | TopicSelect
}
