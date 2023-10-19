<script lang="ts">
  import { goto } from '$app/navigation'
  import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
  import { Tab, TabGroup, storePopup } from '@skeletonlabs/skeleton'
  import '../app.postcss'

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow })
  let tabSet: number = 0
</script>

<TabGroup>
  <Tab bind:group={tabSet} name="tab1" value={1} on:click={() => goto('/palettes')}>Palettes</Tab>
  <Tab bind:group={tabSet} name="tab2" value={2} on:click={() => goto('/draw')}>Draw</Tab>
  <Tab bind:group={tabSet} name="tab3" value={3} on:click={() => goto('/paperjs')}>Paper.js</Tab>
  <Tab bind:group={tabSet} name="tab4" value={4} on:click={() => goto('/tagtree')}>Tagtree</Tab>
  <Tab bind:group={tabSet} name="tab5" value={5} on:click={() => goto('/tagtree2')}>Tagtree2</Tab>
  <Tab bind:group={tabSet} name="tab6" value={6} on:click={() => goto('/sse')}>
    Server side events
  </Tab>
  <Tab bind:group={tabSet} name="tab7" value={7} on:click={() => goto('/xstate')}>Xstate</Tab>
</TabGroup>

<slot />
