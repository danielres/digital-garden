<script lang="ts">
  let can: HTMLCanvasElement

  const SIZE = 250
  const BLOCKSIZE = 3
  let iterations = 40
  let translateX = 0.5
  let translateY = 0
  let zoom = 0.3

  function rgbString(r: number, g: number, b: number) {
    return 'rgb(' + r + ',' + g + ',' + b + ')'
  }

  $: if (can) {
    const context = can.getContext('2d')
    if (context) {
      context.fillStyle = 'black'
      context.fillRect(0, 0, SIZE, SIZE)
    }

    const drawAtom = function (x: number, y: number, rgb: string) {
      if (!context) return

      context.fillStyle = rgb
      context.fillRect(x, y, BLOCKSIZE, BLOCKSIZE)
    }

    for (let y = 1; y < SIZE; y++) {
      for (let x = 1; x < SIZE; x++) {
        let dx = (x - SIZE / 2) / (SIZE * zoom) - translateX
        let dy = (y - SIZE / 2) / (SIZE * zoom) - translateY
        let a = dx
        let b = dy

        for (let t = 1; t < iterations; t++) {
          const d = a * a - b * b + dx
          b = 2 * (a * b) + dy
          a = d

          const H = d > iterations

          if (H) {
            const r = t * 3
            const g = t
            const b = t * 0.5
            const str = rgbString(r, g, b)
            drawAtom(x, y, str)
            break
          }
        }
      }
    }
  }
</script>

<div class="w-fit mx-auto grid justify-items-center gap-8">
  <div class="card variant-soft p-4 w-full space-y-4 text-sm">
    <h2>Simple Mandelbrot rendering example</h2>

    <p>For a more advanced example:</p>

    <ul class="list-disc ml-8">
      <li>
        <b>Github</b>
        :
        <a href="https://github.com/danielres/gardun-fractal-explorer" class="underline">
          danielres/gardun-fractal-explorer
        </a>
      </li>
      <li>
        <b>Demo</b>
        :
        <a href="https://gardun-fractal-explorer.vercel.app/" class="underline">
          Gardun Fractal Explorer
        </a>
      </li>
    </ul>
  </div>

  <div class="text-xs">
    X: <input type="range" min="-1" max="1" step="0.01" bind:value={translateX} />
    Y:
    <input type="range" min="-1" max="1" step="0.01" bind:value={translateY} />
    zoom:
    <input type="range" min="0.3" max="50" step="0.1" bind:value={zoom} />
  </div>

  <canvas bind:this={can} id="gardun" width={SIZE} height={SIZE} />
</div>
