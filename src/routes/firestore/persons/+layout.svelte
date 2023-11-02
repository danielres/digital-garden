<script lang="ts">
  import { getAppContext } from '../appContext'
  import PersonItem from '../components/PersonItem.svelte'
  import Shell2Cols from '../components/Shell2Cols.svelte'

  const { persons } = getAppContext()
</script>

<Shell2Cols>
  <svelte:fragment slot="items">
    {#each $persons as person}
      <PersonItem {person} />
    {/each}
  </svelte:fragment>

  <svelte:fragment slot="main"><slot /></svelte:fragment>
</Shell2Cols>
