<script lang="ts">
  import { onMount } from 'svelte'
  import Superpal from '../Palettes/Superpal.svelte'
  import { clickOutside } from './clickOutside'
  import { HSLAdjustment } from './canvas'
  import { writable } from 'svelte/store'

  let canvas1: HTMLCanvasElement
  let canvas2: HTMLCanvasElement

  const layer1 = writable({
    visible: true,
    name: 'Layer 1',
  })

  const layer2 = writable({
    visible: true,
    name: 'Layer 2',
  })

  let layerActive = layer1

  const WIDTH = 12
  const HEIGHT = 12
  const PIXEL_SIZE = 40

  let drawing = false

  let color = '#000000'

  function startDrawing() {
    drawing = true
  }

  function stopDrawing() {
    drawing = false
  }

  function paint(event: MouseEvent) {
    if (!drawing) return

    const canvas = $layerActive.name === 'Layer 1' ? canvas1 : canvas2
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / PIXEL_SIZE)
    const y = Math.floor((event.clientY - rect.top) / PIXEL_SIZE)
    ctx.fillStyle = color
    ctx.fillRect(x, y, 1, 1)
  }

  function draw(event: MouseEvent) {
    const canvas = $layerActive.name === 'Layer 1' ? canvas1 : canvas2
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / PIXEL_SIZE)
    const y = Math.floor((event.clientY - rect.top) / PIXEL_SIZE)
    ctx.fillStyle = color
    ctx.fillRect(x, y, 1, 1)
  }

  function huePlus() {
    const canvas = $layerActive.name === 'Layer 1' ? canvas1 : canvas2
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return
    const imageData = ctx.getImageData(0, 0, canvas2.width, canvas2.height)
    const adjustedImageData = HSLAdjustment(imageData, 5, 0, 0)
    ctx.putImageData(adjustedImageData, 0, 0)
  }

  function hueMinus() {
    const canvas = $layerActive.name === 'Layer 1' ? canvas1 : canvas2
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return
    const imageData = ctx.getImageData(0, 0, canvas2.width, canvas2.height)
    const adjustedImageData = HSLAdjustment(imageData, -5, 0, 0)
    ctx.putImageData(adjustedImageData, 0, 0)
  }

  onMount(() => {
    canvas1.width = WIDTH
    canvas1.height = HEIGHT
    canvas2.width = WIDTH
    canvas2.height = HEIGHT

    // var canvas2 = document.createElement('canvas')
    // var ctx2 = canvas.getContext('2d') as CanvasRenderingContext2D
    // ctx2.fillStyle = 'blue'
    // ctx2.fillRect(0, 0, 4, 4)

    // ctx.drawImage(canvas2, 0, 0, 200, 200)
  })
</script>

<div class="flex gap-4 h-full">
  <aside class="card p-4 space-y-4">
    <Superpal on:color={(c) => (color = c.detail)} />

    <hr />

    <section class="flex items-center justify-between">
      <div class="font-semibold text-surface-500">Hue shift</div>
      <div class="btn-group variant-ghost">
        <button class="" on:click={hueMinus}>-</button>
        <button class="" on:click={huePlus}>+</button>
      </div>
    </section>

    <hr />

    <section
      class="grid grid-cols-[1fr_auto_auto] gap-x-4 font-semibold text-surface-500 items-center"
    >
      <div class="contents">
        <input
          class="p-0 bg-transparent border-none hover:text-surface-300 transition-colors"
          type="text"
          bind:value={$layer2.name}
        />
        <input class="radio" type="radio" bind:group={layerActive} value={layer2} />
        <input class="checkbox" type="checkbox" bind:checked={$layer2.visible} />
      </div>
      <div class="contents">
        <input
          class="p-0 bg-transparent border-none hover:text-surface-300 transition-colors"
          type="text"
          bind:value={$layer1.name}
        />
        <input class="radio" type="radio" bind:group={layerActive} value={layer1} />
        <input class="checkbox" type="checkbox" bind:checked={$layer1.visible} />
      </div>
    </section>
  </aside>

  <div class="stack">
    <canvas
      class:hidden={!$layer1.visible}
      bind:this={canvas1}
      style="width:{WIDTH * PIXEL_SIZE}px; height:{HEIGHT * PIXEL_SIZE}px;"
      use:clickOutside={stopDrawing}
      on:mousedown={startDrawing}
      on:mouseup={stopDrawing}
      on:mousemove={(e) => paint(e)}
      on:click={(e) => draw(e)}
    />

    <canvas
      class:hidden={!$layer2.visible}
      bind:this={canvas2}
      style="width:{WIDTH * PIXEL_SIZE}px; height:{HEIGHT * PIXEL_SIZE}px;"
      use:clickOutside={stopDrawing}
      on:mousedown={startDrawing}
      on:mouseup={stopDrawing}
      on:mousemove={(e) => paint(e)}
      on:click={(e) => draw(e)}
    />
  </div>
</div>

<style lang="postcss">
  canvas {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    @apply bg-surface-100/10;
  }

  .stack {
    @apply grid;
  }
  .stack > * {
    grid-row-start: 0;
    grid-row-end: 1;
    grid-column-start: 0;
    grid-column-end: 1;
  }
</style>
