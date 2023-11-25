import type { UserCurrent, UserNormalized, UserSelect } from '../types'

export function normalizeUser(user: undefined): undefined
export function normalizeUser(user: UserCurrent): UserNormalized
export function normalizeUser(user: UserSelect): UserNormalized
export function normalizeUser(
  user: UserSelect | UserCurrent | undefined
): UserNormalized | undefined {
  if (typeof user === 'undefined') return undefined
  const { username, avatar, ...rest } = user
  return { ...rest, label: username, image: avatar }
}
