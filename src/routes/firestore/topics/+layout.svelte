<script lang="ts">
  import { page } from '$app/stores'
  import Layout2Cols from '../components/layouts/Layout2Cols.svelte'
  import Tree from '../components/Tree.svelte'
  import { paths } from '../utils/navigation'

  $: has2Cols = $page.url.pathname !== paths.topics()
</script>

{#if has2Cols}
  <Layout2Cols>
    <svelte:fragment slot="items">
      <Tree />
    </svelte:fragment>

    <svelte:fragment slot="main">
      <slot />
    </svelte:fragment>
  </Layout2Cols>
{:else}
  <Layout2Cols>
    <svelte:fragment slot="items">
      <Tree />
    </svelte:fragment>
  </Layout2Cols>
{/if}
