type InflectorException = [string, string]

export class Inflector {
  exceptions: InflectorException[]

  constructor(exceptions: string[][] = []) {
    this.exceptions = exceptions.filter(isInflectorException)
  }

  pluralize = (word: string): string => pluralize(word, this.exceptions)
  singularize = (word: string): string => singularize(word, this.exceptions)
}

export function pluralize(word: string, exceptions: string[][] = []): string {
  return (
    exceptions.filter(isInflectorException).filter((ex) => ex[0] === word)?.[0]?.[1] || word + 's'
  )
}

export function singularize(word: string, exceptions: string[][] = []): string {
  const lastLetter = word.slice(-1)
  const foundException = exceptions
    .filter(isInflectorException)
    .filter((ex) => ex[1] === word)?.[0]?.[0]
  if (foundException) return foundException
  if (lastLetter === 's') return word.slice(0, -1)
  console.warn(`singularize() could not find a mapping for "${word}"`)
  return word
}

function isInflectorException(tuple: string[]): tuple is InflectorException {
  return tuple.length === 2 && typeof tuple[0] === 'string' && typeof tuple[1] === 'string'
}
