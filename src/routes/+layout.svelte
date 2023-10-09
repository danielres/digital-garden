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
  <Tab bind:group={tabSet} name="tab2" value={3} on:click={() => goto('/paperjs')}>Paper.js</Tab>
</TabGroup>

<slot />
