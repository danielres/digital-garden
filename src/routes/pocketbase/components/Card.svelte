<script lang="ts">
  import { twMerge } from 'tailwind-merge'

  export let variant: 'primary' | 'error' | 'neutral' = 'neutral'
  export let bg = true
</script>

<div
  class={twMerge(
    'card p-4',
    'variant-glass-surface text-surface-700-200-token',
    variant === 'error' && 'variant-glass-error text-error-700-200-token',
    variant === 'primary' && 'variant-glass-primary text-primary-700-200-token',
    !bg && '!bg-transparent'
  )}
>
  <slot />
</div>
