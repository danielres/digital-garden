<script lang="ts">
  import { arrow, computePosition, flip, offset, shift, type Placement } from '@floating-ui/dom'
  import { onDestroy, tick } from 'svelte'
  import { getAppContext } from '../appContext'

  export let placement: Placement = 'right'
  export let arrowSelector = '[data-role="tooltip-arrow"]'
  export let onClickOutside = cleanupAfterSelf

  type Side = 'top' | 'right' | 'bottom' | 'left'

  const { ui } = getAppContext()

  const uniqueTooltipElId = 'TOOLTIP_GENERATED_UNIQUE_ELEMENT'
  const tooltipId = Math.random().toString(36).substring(7)

  let uniqueTooltipEl: HTMLElement
  let anchorEl: HTMLElement
  let contentEl: HTMLDivElement

  function findUniqueTooltipEl() {
    return document.getElementById(uniqueTooltipElId) as HTMLDivElement
  }

  function getOwnArrowEl() {
    const foundEl = contentEl.querySelector(arrowSelector) as HTMLElement
    if (foundEl) foundEl.style.position = 'absolute'
    return foundEl ? foundEl : document.createElement('div')
  }

  function setUniqueTooltipEl() {
    const foundEl = findUniqueTooltipEl()
    if (foundEl) {
      uniqueTooltipEl = foundEl
      return
    }
    const newEl = document.createElement('div')
    newEl.id = uniqueTooltipElId
    newEl.style.position = 'absolute'
    document.body.appendChild(newEl)
    uniqueTooltipEl = newEl
  }

  type ToggleEvent = Event & { currentTarget: EventTarget }
  const toggle = (e: ToggleEvent) => {
    anchorEl = e.currentTarget as HTMLElement
    $ui.tooltip.id === tooltipId ? cleanupAfterSelf() : open()
  }

  function open() {
    $ui.tooltip.id = tooltipId
    setUniqueTooltipEl()
    uniqueTooltipEl.innerHTML = ''
    uniqueTooltipEl.appendChild(contentEl)
    doComputePosition()
  }

  function cleanupAfterSelf() {
    if ($ui.tooltip.id !== tooltipId) return
    const foundEl = uniqueTooltipEl
    // if (foundEl) document.body.removeChild(foundEl)
    $ui.tooltip.id = null
  }

  async function doComputePosition() {
    if ($ui.tooltip.id !== tooltipId || !anchorEl || !uniqueTooltipEl) return

    await tick()

    const arrowEl = getOwnArrowEl()
    const middleware = [offset(16), flip(), shift({ padding: 5 }), arrow({ element: arrowEl })]
    const computed = await computePosition(anchorEl, uniqueTooltipEl, { placement, middleware })

    uniqueTooltipEl.style.left = `${computed.x}px`
    uniqueTooltipEl.style.top = `${computed.y}px`

    const placementSide = computed.placement.split('-')[0] as Side
    const sidesInverted = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' } as const
    const arrowSide = sidesInverted[placementSide]

    arrowEl.style.removeProperty('transform')

    const arrowRotation = getArrowRotation(arrowSide)
    arrowEl.style.transform = `rotate(${arrowRotation}deg)`

    const arrowX = computed.middlewareData.arrow?.x
    const arrowY = computed.middlewareData.arrow?.y

    Object.assign(arrowEl.style, {
      left: arrowX != null ? `${arrowX}px` : '',
      top: arrowY != null ? `${Math.max(arrowY, 10)}px` : '',
      right: '',
      bottom: '',
      [arrowSide]: '-7px',
    })
  }

  function getArrowRotation(arrowSide: Side) {
    if (arrowSide === 'right') return 45
    if (arrowSide === 'top') return -45
    if (arrowSide === 'left') return -135
    if (arrowSide === 'bottom') return 135
    return 0
  }

  function clickOutside(
    node: HTMLElement,
    callbackFunction: (clickedElement: HTMLElement) => void
  ) {
    function onClick(event: MouseEvent) {
      const clickedElement = event.target as HTMLElement
      if (node.contains(clickedElement)) return
      callbackFunction(clickedElement)
    }

    document.body.addEventListener('click', onClick)

    return {
      update(newCallbackFunction: () => void) {
        callbackFunction = newCallbackFunction
      },
      destroy() {
        document.body.removeEventListener('click', onClick)
      },
    }
  }

  onDestroy(cleanupAfterSelf)
</script>

<svelte:window
  on:resize={doComputePosition}
  on:keydown={({ key }) => {
    if (key === 'Escape') cleanupAfterSelf()
  }}
/>
<svelte:body on:scroll={doComputePosition} />

<slot {toggle} close={cleanupAfterSelf} />

<div style:display="none">
  <div
    bind:this={contentEl}
    role="tooltip"
    use:clickOutside={(clickedElement) => {
      if (clickedElement === anchorEl) return
      if ($ui.tooltip.id !== tooltipId) return
      onClickOutside()
    }}
  >
    {#if tooltipId === $ui.tooltip.id}
      <slot
        name="content"
        {toggle}
        close={cleanupAfterSelf}
        isOpen={$ui.tooltip.id === tooltipId}
      />
    {/if}
  </div>
</div>

<style lang="postcss">
  .arrow {
    @apply border-t-2 border-r-2;
  }
</style>
