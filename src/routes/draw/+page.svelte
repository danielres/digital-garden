<script lang="ts">
  import { onMount } from 'svelte'
  import Superpal from '../Palettes/Superpal.svelte'
  import { clickOutside } from './clickOutside'
  import { HSLAdjustment } from './canvas'
  import { writable } from 'svelte/store'

  let canvas: HTMLCanvasElement

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

  function paint(event: MouseEvent, ctx: CanvasRenderingContext2D | null) {
    if (!drawing) return
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / PIXEL_SIZE)
    const y = Math.floor((event.clientY - rect.top) / PIXEL_SIZE)
    if (!ctx) return
    ctx.fillStyle = color
    ctx.fillRect(x, y, 1, 1)
  }

  function draw(event: MouseEvent, ctx: CanvasRenderingContext2D | null) {
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / PIXEL_SIZE)
    const y = Math.floor((event.clientY - rect.top) / PIXEL_SIZE)
    if (!ctx) return
    ctx.fillStyle = color
    ctx.fillRect(x, y, 1, 1)
  }

  let ctx: CanvasRenderingContext2D

  function huePlus() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const adjustedImageData = HSLAdjustment(imageData, 5, 0, 0)
    ctx.putImageData(adjustedImageData, 0, 0)
  }

  function hueMinus() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const adjustedImageData = HSLAdjustment(imageData, -5, 0, 0)
    ctx.putImageData(adjustedImageData, 0, 0)
  }

  onMount(() => {
    canvas.width = WIDTH
    canvas.height = HEIGHT
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D

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
  </aside>
  <canvas
    bind:this={canvas}
    style="width:{WIDTH * PIXEL_SIZE}px; height:{HEIGHT * PIXEL_SIZE}px;"
    use:clickOutside={stopDrawing}
    on:mousedown={startDrawing}
    on:mouseup={stopDrawing}
    on:mousemove={(e) => paint(e, ctx)}
    on:click={(e) => draw(e, ctx)}
  />
</div>

<style lang="postcss">
  canvas {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    @apply bg-surface-100/10;
  }
</style>
