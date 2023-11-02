<script lang="ts">
  import Shell2Cols from './../components/Shell2Cols.svelte'
  import { getAppContext } from '../appContext'
  import TraitItem from './../components/TraitItem.svelte'

  const { traits } = getAppContext()
</script>

<Shell2Cols>
  <svelte:fragment slot="items">
    {#each $traits as trait}
      <TraitItem {trait} from="trait" />
    {/each}
  </svelte:fragment>

  <svelte:fragment slot="main">
    <slot />
  </svelte:fragment>
</Shell2Cols>
