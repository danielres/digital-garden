import { describe, it, expect } from 'vitest'
import { Inflector, pluralize, singularize } from './inflect'

const exceptions = [['person', 'people']]

describe('Inflector(exceptions)', () => {
  const inflector = new Inflector(exceptions)

  describe('pluralize(word)', () => {
    it('pluralizes the word', () => {
      const actual = inflector.pluralize('person')
      const expected = 'people'
      expect(actual).toEqual(expected)
    })
  })

  describe('singularize(word)', () => {
    it('singularizes the word', () => {
      const actual = inflector.singularize('people')
      const expected = 'person'
      expect(actual).toEqual(expected)
    })
  })
})

describe('pluralize(string, exceptions?)', () => {
  it('pluralizes the string according to the exceptions', () => {
    const actual = pluralize('person', exceptions)
    const expected = 'people'
    expect(actual).toEqual(expected)
  })

  describe('when the string is not in the exceptions', () => {
    it('appends an "s" to the string', () => {
      const actual = pluralize('orange')
      const expected = 'oranges'
      expect(actual).toEqual(expected)
    })
  })
})

describe('singularize(string, exceptions?)', () => {
  it('singularizes the string according to the exceptions', () => {
    const actual = singularize('people', exceptions)
    const expected = 'person'
    expect(actual).toEqual(expected)
  })

  describe('when the string is not in the exceptions', () => {
    describe('when the string ends in "s"', () => {
      it('removes the "s" from the string', () => {
        const actual = singularize('oranges')
        const expected = 'orange'
        expect(actual).toEqual(expected)
      })
    })

    describe('when the does not end in "s"', () => {
      it('returns the original word', () => {
        const actual = singularize('mice', exceptions)
        const expected = 'mice'
        expect(actual).toEqual(expected)
      })
    })
  })
})
