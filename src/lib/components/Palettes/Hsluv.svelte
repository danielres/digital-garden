<script lang="ts">
  import { Hsluv } from 'hsluv'
  import { derived, writable } from 'svelte/store'

  const HUES = 8
  const LUMS = 8

  const conv = new Hsluv()

  const sat = writable(80)
  const startHue = writable(0)

  const colors = derived([sat, startHue], ([$sat, $startHue]) => {
    return Array.from({ length: HUES }, (_, i) => {
      conv.hsluv_h = (360 / HUES) * i + $startHue
      conv.hsluv_s = $sat

      return Array.from({ length: LUMS }, (_, i) => {
        conv.hsluv_l = (100 / LUMS) * i
        conv.hsluvToHex()
        return conv.hex
      })
    })
  })
</script>

<div>
  <div class="grid w-64 gap-4">
    <div class="grid" style="grid-template-columns: repeat({LUMS}, minmax(0, 1fr))">
      {#each $colors as row}
        {#each row as cell}
          <div class="aspect-square" style="background: {cell}" />
        {/each}
      {/each}
    </div>

    <div class="grid grid-cols-2 gap-8 text-center text-surface-500">
      <label>
        <input class="input" type="range" bind:value={$sat} />
        Saturation {$sat}
      </label>

      <label>
        <input type="range" bind:value={$startHue} min={0} max={360 / HUES} />
        Hue shift {$startHue}
      </label>
    </div>
  </div>
</div>
