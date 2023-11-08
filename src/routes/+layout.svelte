<script lang="ts">
  import { goto } from '$app/navigation'
  import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
  import { LightSwitch, Tab, TabGroup, storePopup } from '@skeletonlabs/skeleton'
  import '../app.postcss'
  import ThemeSwitch from './ThemeSwitch.svelte'

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow })
  let tabSet: number = 0
</script>

<div class="stack">
  <TabGroup>
    <Tab bind:group={tabSet} name="tab1" value={1} on:click={() => goto('/palettes')}>Palettes</Tab>
    <Tab bind:group={tabSet} name="tab2" value={2} on:click={() => goto('/draw')}>Draw</Tab>
    <Tab bind:group={tabSet} name="tab3" value={3} on:click={() => goto('/paperjs')}>Paper.js</Tab>
    <Tab bind:group={tabSet} name="tab4" value={4} on:click={() => goto('/tagtree')}>Tagtree</Tab>
    <Tab bind:group={tabSet} name="tab5" value={5} on:click={() => goto('/tagtree2')}>Tagtree2</Tab>
    <Tab bind:group={tabSet} name="tab6" value={6} on:click={() => goto('/sse')}>
      Server side events
    </Tab>
    <Tab bind:group={tabSet} name="tab7" value={7} on:click={() => goto('/xstate-counter')}>
      Xstate-counter
    </Tab>
    <Tab bind:group={tabSet} name="tab8" value={8} on:click={() => goto('/xstate')}>Xstate</Tab>
    <Tab bind:group={tabSet} name="tab9" value={9} on:click={() => goto('/fsm')}>Fsm</Tab>
    <Tab bind:group={tabSet} name="tab10" value={10} on:click={() => goto('/sveltefire')}>
      Sveltefire
    </Tab>
    <Tab bind:group={tabSet} name="tab11" value={11} on:click={() => goto('/mandelbrot')}>
      Mandelbrot
    </Tab>
    <Tab bind:group={tabSet} name="tab12" value={12} on:click={() => goto('/firestore')}>
      Firestore
    </Tab>
  </TabGroup>
  <div class="place-self-center justify-self-end mr-4 flex gap-2">
    <ThemeSwitch />
    <LightSwitch width="w-12" height="h-6" />
  </div>
</div>

<div class="overflow-y-auto">
  <slot />
</div>
