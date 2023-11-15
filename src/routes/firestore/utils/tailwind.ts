import { twMerge } from 'tailwind-merge'

export function mergeTwObjects(twObjects: Record<string, string>[]) {
  return twObjects.reduce((acc, curr) => {
    Object.entries(curr).forEach(([key, value]) => {
      acc[key] = twMerge(acc[key], value)
    })
    return acc
  }, {})
}
