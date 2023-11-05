<script lang="ts">
  import { arrow, computePosition, flip, offset, shift, type Placement } from '@floating-ui/dom'
  import { focusTrap } from '@skeletonlabs/skeleton'
  import { fade } from 'svelte/transition'

  let functionToCall = () => {}

  let tooltip: HTMLDivElement
  let anchor: HTMLButtonElement
  let arrowEl: HTMLElement
  let isOpen = false

  export let placement: Placement = 'right'
  export let zindex = 100

  const close = () => (isOpen = false)
  const toggle = () => (isOpen = !isOpen)
  const setAnchor = (el: HTMLElement) => (anchor = el as HTMLButtonElement)

  function confirm(func: () => void, el?: HTMLElement) {
    if (el) setAnchor(el)
    functionToCall = func
    toggle()
  }

  function doCompute() {
    computePosition(anchor, tooltip, {
      placement,
      middleware: [
        //
        offset(16),
        flip(),
        shift({ padding: 5 }),
        arrow({ element: arrowEl }),
      ],
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(tooltip.style, { left: `${x}px`, top: `${y}px` })

      const placementSide = placement.split('-')[0] as 'top' | 'right' | 'bottom' | 'left'

      const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
      }[placementSide]

      arrowEl.classList.remove('arrow-top', 'arrow-right', 'arrow-bottom', 'arrow-left')
      arrowEl.classList.add(`arrow-${placementSide}`)

      const arrowX = middlewareData.arrow?.x
      const arrowY = middlewareData.arrow?.y

      Object.assign(arrowEl.style, {
        left: arrowX != null ? `${arrowX}px` : '',
        top: arrowY != null ? `${Math.max(arrowY, 10)}px` : '',
        right: '',
        bottom: '',
        [staticSide]: '-7px',
      })
    })
  }

  $: if (anchor && tooltip) doCompute()
</script>

<svelte:window on:resize={() => anchor && tooltip && doCompute()} />

<slot {toggle} {setAnchor} {confirm} />

{#if isOpen}
  <button
    style:z-index={zindex}
    in:fade={{ duration: 150 }}
    out:fade={{ delay: 150, duration: 150 }}
    type="button"
    class="fixed inset-0 bg-surface-50-900-token w-full opacity-20"
    on:click={close}
  />

  <div
    style:z-index={zindex}
    bind:this={tooltip}
    use:focusTrap={true}
    in:fade={{ duration: 150, delay: 150 }}
    out:fade={{ duration: 150 }}
    class="rounded absolute text-error-600-300-token bg-surface-800 shadow-lg"
  >
    <div class="variant-soft-error p-8 space-y-8 rounded border-2 border-error-500">
      <slot name="description" />

      <div class="buttons">
        <button type="button" class="btn rounded variant-ghost-error" on:click={close}>
          Cancel
        </button>
        <button type="button" class="btn rounded variant-filled-error" on:click={functionToCall}>
          Confirm
        </button>
      </div>
    </div>

    <div class="arrow border-error-500" bind:this={arrowEl} style:z-index={50}>
      <div class="bg-surface-800">
        <div class="variant-soft-error w-[12px] aspect-square" />
      </div>
    </div>
  </div>
{/if}

<style lang="postcss">
  .buttons {
    @apply flex gap-4 justify-center;
  }

  .arrow {
    position: absolute;
    transform: rotate(45deg);
  }

  div :global(.arrow-left) {
    @apply border-t-2 border-r-2;
  }

  div :global(.arrow-right) {
    @apply border-b-2 border-l-2;
  }

  div :global(.arrow-top) {
    @apply border-b-2 border-r-2;
  }

  div :global(.arrow-bottom) {
    @apply border-t border-l;
  }
</style>
