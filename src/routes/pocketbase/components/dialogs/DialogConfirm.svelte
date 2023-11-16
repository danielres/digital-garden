<script lang="ts">
  import { focusTrap } from '@skeletonlabs/skeleton'
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import { twJoin, twMerge } from 'tailwind-merge'

  let _focusTrap = true
  let _variant: 'danger' | 'info' | 'neutral' = 'neutral'
  let _fade = 175

  export { _focusTrap as focusTrap }
  export { _variant as variant }
  export { _fade as fade }
  export let arrow = true
  export let overrides: Record<string, string> = {}
  export let borderWidth = 2
  export let arrowSize = 12
  export let radius = 4
  export let backdrop = true
  export let confirmButtons = true

  const base = {
    container: '',
    backdrop: 'fixed inset-0 bg-surface-50-900-token w-full opacity-40 pointer-events-none',
    dialog: 'border-2 border-error-500 relative shadow-lg',
    content: 'space-y-2',
    buttons: 'flex gap-4 justify-center',
    button: 'btn outline-none opacity-70 hover:opacity-100 focus:opacity-100  ',
  }

  const variant = {
    danger: {
      bg: 'bg-error-200 dark:bg-[color-mix(in_oklch,theme(colors.error.900)_80%,theme(colors.surface.800))]',
      dialog: 'text-error-600-300-token variant-glass-error',
      borderColor: 'border-error-300-600-token',
      button: 'variant-soft-error focus:variant-filled-error hover:variant-filled-error',
    },

    info: {
      bg: 'bg-primary-200 dark:bg-[color-mix(in_oklch,theme(colors.primary.900)_80%,theme(colors.surface.800))]',
      dialog: 'text-primary-600-300-token',
      borderColor: 'border-primary-300-600-token',
      button: 'variant-soft-primary focus:variant-filled-primary hover:variant-filled-primary',
    },

    neutral: {
      bg: 'bg-surface-200 dark:bg-[color-mix(in_oklch,theme(colors.surface.900)_80%,theme(colors.surface.800))]',
      dialog: 'text-surface-600-300-token',
      borderColor: 'border-surface-300-600-token',
      button: 'variant-soft-surface focus:variant-filled-surface hover:variant-filled-surface',
    },
  }[_variant]

  const s = mergeTwObjects([
    base,
    variant,
    { dialog: twJoin(variant.dialog, variant.bg, variant.borderColor) },
    overrides,
  ])

  function mergeTwObjects(twObjects: Record<string, string>[]) {
    return twObjects.reduce((acc, curr) => {
      Object.entries(curr).forEach(([key, value]) => {
        acc[key] = twMerge(acc[key], value)
      })
      return acc
    }, {})
  }

  const focusTrapWithDelayHack = (node: HTMLElement, enabled: boolean) => {
    setTimeout(() => focusTrap(node, enabled), 0) // fix for focusTrap interfering with floating ui positioning
  }

  const dispatch = createEventDispatcher()
</script>

<div
  in:fade={{ duration: _fade }}
  out:fade={{ delay: _fade, duration: _fade }}
  class={s.backdrop}
  class:hidden={!backdrop}
/>

<div in:fade={{ delay: _fade, duration: _fade }} out:fade={{ duration: _fade }} class={s.container}>
  <div class={s.dialog}>
    <div class={s.content}>
      {#if arrow}
        <div
          data-role="tooltip-arrow"
          class="{s.bg} {s.borderColor}"
          style:border-top-width="{borderWidth}px"
          style:border-right-width="{borderWidth}px"
          style:width="{arrowSize}px"
          style:height="{arrowSize}px"
          style:border-top-right-radius="{Math.min(radius, 4)}px"
        />
      {/if}
      <slot>Do you want to confirm?</slot>
    </div>

    {#if confirmButtons}
      <div class={s.buttons} use:focusTrapWithDelayHack={_focusTrap}>
        <button type="button" class={s.button} on:click={() => dispatch('cancel')}>Cancel</button>

        <button type="button" class={s.button} on:click={() => dispatch('confirm')}>Confirm</button>
      </div>
    {/if}
  </div>
</div>
