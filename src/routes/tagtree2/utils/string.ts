export function upperFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function slugify(string: string) {
  return string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}
