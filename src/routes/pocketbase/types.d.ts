export type UserInsert = {
  username: string
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
  updated: Date
  username: string
  verified: boolean
}

export type UserCurrent = UserSelect & {
  email: string
}
