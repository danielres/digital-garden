<script lang="ts">
  import { getAppContext } from '../appContext'
  import Item from '../components/Item.svelte'
  import Layout2Cols from '../components/layouts/Layout2Cols.svelte'

  const { traits } = getAppContext()
</script>

<Layout2Cols>
  <svelte:fragment slot="items">
    {#each $traits as trait}
      <Item item={trait} on:delete={() => traits.del(trait.id)} />
    {/each}
  </svelte:fragment>

  <svelte:fragment slot="main">
    <slot />
  </svelte:fragment>
</Layout2Cols>
