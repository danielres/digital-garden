<script lang="ts">
  import { getAppContext } from '../appContext'
  import TraitItem from './../components/TraitItem.svelte'

  const { traits } = getAppContext()
</script>

<div class="grid grid-cols-2 gap-8">
  <div class="space-y-2">
    {#each $traits as trait}
      <TraitItem {trait} />
    {/each}
  </div>

  <div class="variant-ghost p-4">
    <slot />
  </div>
</div>
