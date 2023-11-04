<script lang="ts">
  import { getAppContext } from '../appContext'
  import Item from '../components/Item.svelte'
  import Layout2Cols from '../components/layouts/Layout2Cols.svelte'

  const { contents } = getAppContext()
</script>

<Layout2Cols>
  <svelte:fragment slot="items">
    {#each $contents as item}
      <Item {item} on:delete={() => contents.del(item.id)} />
    {/each}
  </svelte:fragment>

  <svelte:fragment slot="main">
    <slot />
  </svelte:fragment>
</Layout2Cols>
