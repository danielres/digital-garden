<script lang="ts">
  import paper, { Path } from 'paper'
  import { onMount } from 'svelte'

  let svg = ''

  onMount(() => {
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement | null
    console.log(canvas)
    if (!canvas) return
    paper.setup(canvas)

    const rect1 = new paper.Path.Rectangle({ point: [0, 0], size: [30, 30], fillColor: 'blue' })
    const rect2 = new paper.Path.Rectangle({ point: [30, 0], size: [30, 30], fillColor: 'green' })
    const rect3 = new paper.Path.Rectangle({ point: [30, 30], size: [30, 30], fillColor: 'green' })
    const rect4 = new paper.Path.Rectangle({ point: [30, 30], size: [30, 30], fillColor: 'green' })

    console.log(rect1.fillColor)
    console.log(rect2.fillColor)
    console.log(rect3.fillColor)

    const merged = rect1.unite(rect3) //.unite(rect3).subtract(rect4)

    merged.selected = true
    // rect1.selected = true
    // rect2.selected = true
    // rect3.selected = true
    // rect4.selected = true

    rect1.remove()
    rect2.remove()
    rect3.remove()
    rect4.remove()
    // merged.remove()

    svg = paper.project.exportSVG({ asString: true }) as string
  })
</script>

<canvas id="myCanvas" />

<p>{JSON.stringify(svg, null, 2)}</p>

{#if svg}
  {@html svg}
{/if}

<style lang="postcss">
  #myCanvas {
    @apply border border-white/30 bg-white/5 my-16 mx-auto;
    width: 400px;
    height: 400px;
  }
</style>
