import { describe, it, expect } from 'vitest'
import { nestedify } from './forms'

describe('forms.nestedify()', () => {
  const input = {
    targetKind: 'person',
    targetId: 'targetId',
    topicId: 'topicId',
    text: '',
    'levels.interest': '3',
    'levels.expertise': '3',
    'deep.nested.value': 'deepnestedvalue',
  }

  it('Converts an object with dot-delimited keys into a nested object structure', () => {
    const actual = nestedify(input)

    const expected = {
      targetKind: 'person',
      targetId: 'targetId',
      topicId: 'topicId',
      text: '',
      levels: {
        interest: 3,
        expertise: 3,
      },
      deep: {
        nested: {
          value: 'deepnestedvalue',
        },
      },
    }

    expect(actual).toEqual(expected)
  })
})
