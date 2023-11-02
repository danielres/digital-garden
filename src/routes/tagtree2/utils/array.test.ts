import { describe, it, expect } from 'vitest'
import { countOccurrences } from './array'

describe('countOccurrences()', () => {
  it('counts occurrences of each string', () => {
    const actual = countOccurrences(['person', 'content', 'person'])
    const expected = { person: 2, content: 1 }

    expect(actual).toEqual(expected)
  })

  it('returns an empty object for an empty array', () => {
    const actual = countOccurrences([])
    const expected = {}

    expect(actual).toEqual(expected)
  })

  it('handles arrays with a single string', () => {
    const actual = countOccurrences(['person'])
    const expected = { person: 1 }

    expect(actual).toEqual(expected)
  })

  it('handles arrays with multiple identical strings', () => {
    const actual = countOccurrences(['person', 'person', 'person'])
    const expected = { person: 3 }

    expect(actual).toEqual(expected)
  })
})
