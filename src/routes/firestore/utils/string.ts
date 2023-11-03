export function truncate(str: string, maxLength = 20) {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}

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

export function sanitizeFormInput(str: string) {
  return upperFirst(str.replace(/\s+/g, ' ').trim())
}

export function stripHtml(html: string): string {
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}
