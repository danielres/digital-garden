<script lang="ts">
  import { twMerge } from 'tailwind-merge'

  export let variant: 'info' | 'error' = 'info'
</script>

<div
  class={twMerge(
    'card p-4',
    'variant-glass-primary text-primary-700-200-token',
    variant === 'error' && 'variant-glass-error text-error-700-200-token'
  )}
>
  <slot />
</div>
