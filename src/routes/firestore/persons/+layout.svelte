<script lang="ts">
  import { getAppContext } from '../appContext'
  import PersonItem from '../components/PersonItem.svelte'

  const { persons } = getAppContext()
</script>

<div class="grid grid-cols-2 gap-8">
  <div>
    {#each $persons as person, i}
      {#if i > 0}<hr />{/if}

      <div class="py-4">
        <PersonItem {person} />
      </div>
    {/each}
  </div>

  <div class="variant-ghost p-4">
    <slot />
  </div>
</div>
