<script lang="ts">
  import { onMount, tick } from 'svelte'
  import Superpal from '../Palettes/Superpal.svelte'
  import { clickOutside } from './clickOutside'
  import { HSLAdjustment } from './canvas'
  import { writable } from 'svelte/store'
  import { localStorageStore } from '@skeletonlabs/skeleton'

  const WIDTH = 12
  const HEIGHT = 12
  const PIXEL_SIZE = 40

  const layers = localStorageStore('layers', [
    { visible: true, name: 'Layer 2', id: 'canvas2', imageData: '' },
    { visible: true, name: 'Layer 1', id: 'canvas1', imageData: '' },
  ])

  const layerActiveIdx = writable($layers.length - 1)

  let color = '#000000'
  let drawing = false

  const startDrawing = () => (drawing = true)
  const stopDrawing = () => (drawing = false)

  function reset() {
    $layers = []
    addLayer()
    addLayer()
  }

  const getActive2DCanvas = () => {
    const selector = '#' + $layers[$layerActiveIdx].id
    const canvas = document.querySelector(selector) as HTMLCanvasElement | null
    if (!canvas) return { canvas: null, ctx: null }
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    return { canvas, ctx }
  }

  async function addLayer() {
    const newLayer = {
      visible: true,
      name: 'Layer ' + ($layers.length + 1),
      id: 'canvas' + ($layers.length + 1),
      imageData: '',
    }
    $layers = [newLayer, ...$layers]

    await tick()

    const canvasEl = document.querySelector('#' + newLayer.id) as HTMLCanvasElement | null
    if (!canvasEl) return
    canvasEl.width = WIDTH
    canvasEl.height = HEIGHT
    canvasEl.width = WIDTH
    canvasEl.height = HEIGHT

    $layerActiveIdx = 0
  }

  function paint(event: MouseEvent) {
    if (!drawing) return
    const { canvas, ctx } = getActive2DCanvas()
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / PIXEL_SIZE)
    const y = Math.floor((event.clientY - rect.top) / PIXEL_SIZE)
    ctx.fillStyle = color
    ctx.fillRect(x, y, 1, 1)
    saveImageData()
  }

  function saveImageData() {
    const { canvas, ctx } = getActive2DCanvas()
    if (!ctx) return

    const dataUrl = canvas.toDataURL()
    $layers[$layerActiveIdx].imageData = dataUrl
  }

  function draw(event: MouseEvent) {
    const selector = '#' + $layers[$layerActiveIdx].id
    const canvas = document.querySelector(selector) as HTMLCanvasElement | null
    if (!canvas) return
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / PIXEL_SIZE)
    const y = Math.floor((event.clientY - rect.top) / PIXEL_SIZE)
    ctx.fillStyle = color
    ctx.fillRect(x, y, 1, 1)
    saveImageData()
  }

  function huePlus() {
    const { canvas, ctx } = getActive2DCanvas()
    if (!canvas) return
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const adjustedImageData = HSLAdjustment(imageData, 5, 0, 0)
    ctx.putImageData(adjustedImageData, 0, 0)
  }

  function hueMinus() {
    const { canvas, ctx } = getActive2DCanvas()
    if (!canvas) return
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const adjustedImageData = HSLAdjustment(imageData, -5, 0, 0)
    ctx.putImageData(adjustedImageData, 0, 0)
  }

  function selectCanvasById(id: string) {
    const selector = '#' + id
    const canvas = document.querySelector(selector) as HTMLCanvasElement | null
    return canvas
  }

  function restoreLayers() {
    $layers.forEach((layer) => {
      const canvas = selectCanvasById(layer.id)
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const img = new Image()
      img.src = layer.imageData
      img.onload = () => ctx.drawImage(img, 0, 0)
    })
  }

  function initCanvasDimensions() {
    $layers.forEach(({ id }) => {
      const canvasEl = document.querySelector('#' + id) as HTMLCanvasElement | null
      if (!canvasEl) return
      canvasEl.width = WIDTH
      canvasEl.height = HEIGHT
      canvasEl.width = WIDTH
      canvasEl.height = HEIGHT
    })
  }

  onMount(() => {
    initCanvasDimensions()

    restoreLayers()
  })
</script>

<div class="flex gap-4 h-full">
  <aside class="card p-4 space-y-4">
    <div>
      <button on:click={reset} class="btn variant-soft rounded btn-sm">Reset</button>
    </div>

    <hr />

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
      class="grid grid-cols-[1fr_auto_auto_auto] gap-x-2 font-semibold text-surface-500 items-center gap-y-2"
    >
      <div class="contents">
        {#each $layers as layer, i}
          <div class="contents">
            <input
              class="p-0 bg-transparent border-none hover:text-surface-300 transition-colors"
              type="text"
              bind:value={layer.name}
            />
            <input class="radio" type="radio" bind:group={$layerActiveIdx} value={i} />
            <input class="checkbox" type="checkbox" bind:checked={layer.visible} />
            <button
              class="btn-sm variant-soft rounded w-6 aspect-square text-center p-0"
              on:click={() => {
                confirm('Are you sure you want to delete this layer?')
                $layers.splice(i, 1)
                $layers = $layers
              }}
            >
              -
            </button>
          </div>
        {/each}
        <button on:click={addLayer}>Add layer</button>
      </div>
    </section>
  </aside>

  <div class="stack">
    {#each [...$layers].reverse() as layer}
      <canvas
        id={layer.id}
        class:hidden={!layer.visible}
        style="width:{WIDTH * PIXEL_SIZE}px; height:{HEIGHT * PIXEL_SIZE}px;"
        use:clickOutside={stopDrawing}
        on:mousedown={startDrawing}
        on:mouseup={stopDrawing}
        on:mousemove={(e) => paint(e)}
        on:click={(e) => draw(e)}
      />
    {/each}
  </div>
  <pre>{JSON.stringify($layers, null, 1)}</pre>
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
