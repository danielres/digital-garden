import { describe, expect, it } from 'vitest'
import { mergeTwObjects } from './tailwind'


describe('', () => {
  it('', () => {
    const base = {
      container: '',
      dialog: 'p-8 shadow',
      buttons: 'flex gap-4 justify-center',
    }

    const variant = {
      bg: 'bg-error-200 dark:bg-error-600',
      dialog: 'text-error-600-300-token',
    }

    const overrides = {
      bg: 'bg-white',
      dialog: 'p-2 text-black',
      buttons: 'grid',
      text: 'text-black',
    }

    const actual = mergeTwObjects([base, variant, overrides])

    const expected = {
      bg: 'dark:bg-error-600 bg-white',
      container: '',
      dialog: 'shadow p-2 text-black',
      buttons: 'gap-4 justify-center grid',
      text: 'text-black',
    }

    expect(actual).toEqual(expected)
  })
})
