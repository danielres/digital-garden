import { describe, it, expect } from 'vitest'
import { extractNestedInputs } from './forms'

const input = {
  picture: 'http://...',
  body: 'Lorem',
  'traits[ID1][text]': 'one',
  'traits[ID2][text]': 'two',
  'traits[ID3][text]': 'three',
  'traits[ID4][text]': 'four',
  'other[XYZ][property]': 'value',
}

describe('forms.extractNestedInputs', () => {
  it('', () => {
    const actual = extractNestedInputs(input)

    const expected = {
      picture: 'http://...',
      body: 'Lorem',
      traits: {
        ID1: { text: 'one' },
        ID2: { text: 'two' },
        ID3: { text: 'three' },
        ID4: { text: 'four' },
      },
      other: {
        XYZ: { property: 'value' },
      },
    }

    expect(actual).toEqual(expected)
  })
})
