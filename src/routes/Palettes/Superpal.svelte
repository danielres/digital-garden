<script lang="ts">
  import { superpal } from 'superpal'
  import { derived, writable } from 'svelte/store'

  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  const baseColor = writable('#60a5fa')
  const sat = writable(0.75)
  const colorSpace = writable<'okhsl' | 'hsl' | 'hsluv'>('hsluv')

  const palette = derived([baseColor, sat, colorSpace], ([$baseColor, $sat, $colorSpace]) => {
    const { metadata, gray, ...values } = superpal($baseColor, {
      colorSpace: $colorSpace,
      adjustSaturation: true,
      saturationFinetune: Array(9).fill($sat),
      colorLightnessValues: [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
      grayscaleSaturation: 0.175,
      colorKeys: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
      spreadOutMinMaxValues: false,
      maxHueShiftAmount: 0,
    })
    return { metadata, values }
  })
</script>

<div class="grid gap-4">
  <div>
    <div class="flex justify-between">
      <h2>Model:</h2>
      <label class="flex gap-2 items-center">
        <input type="radio" class="radio" bind:group={$colorSpace} value="hsl" />
        <div>hsl</div>
      </label>
      <label class="flex gap-2 items-center">
        <input type="radio" class="radio" bind:group={$colorSpace} value="hsluv" />
        <div>hsluv</div>
      </label>
      <label class="flex gap-2 items-center">
        <input type="radio" class="radio" bind:group={$colorSpace} value="okhsl" />
        <div>okhsl</div>
      </label>
    </div>
  </div>

  <div class="flex items-center justify-between">
    <h2>Base color:</h2>
    <input type="color" bind:value={$baseColor} />
  </div>

  <div class="w-64 grid gap-4">
    <div class="grid grid-cols-9">
      {#each Object.entries($palette.values) as [k, v]}
        {#each Object.entries(v) as [intensity, res]}
          <button
            class="aspect-square"
            style="background: {res}"
            on:click={() => dispatch('color', res)}
          />
        {/each}
      {/each}
    </div>

    <div class="grid gap-8 text-center text-surface-500">
      <label>
        <input type="range" bind:value={$sat} min={0} max={1} step={0.05} />
        Saturation {$sat}
      </label>
    </div>
  </div>

  <!-- <pre>{JSON.stringify($palette, null, 2)}</pre> -->
</div>
