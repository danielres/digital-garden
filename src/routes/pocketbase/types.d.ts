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

export type UserCurrent = UserSelect & {
  email: string
}

export type Trait = {
  desc: string
  level: number
  kind: string
  label: string
  slug: string
  collectionName: 'topics' | 'users'
  label: string
  slug: string
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
