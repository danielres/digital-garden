<script lang="ts">
  import { twMerge } from 'tailwind-merge'

  let _class = ''
  export { _class as class }
  export let variant: 'primary' | 'error' | 'neutral' = 'neutral'
  export let bg = true
</script>

<div
  class={twMerge(
    'card p-4',
    variant === 'neutral' && 'variant-glass-surface text-surface-700-200-token',
    variant === 'error' && 'variant-glass-error text-error-700-200-token',
    variant === 'primary' && 'variant-glass-primary text-primary-700-200-token',
    !bg && '!bg-transparent',
    _class
  )}
>
  <slot />
</div>
