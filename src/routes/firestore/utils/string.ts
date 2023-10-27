export function truncate(str: string, maxLength = 20) {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}
