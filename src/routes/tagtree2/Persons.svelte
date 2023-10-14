<script lang="ts">
  import TraitsList from './TraitsList.svelte'
  import { getPersonsContext } from './usePersons'

  const { persons } = getPersonsContext()
</script>

<div class="flex flex-wrap gap-4">
  {#each $persons as person}
    <div class="min-w-[50%] flex-grow">
      <h2>{person.name}</h2>

      <div class="variant-soft rounded">
        <TraitsList {person} on:personNodeClicked />
      </div>
    </div>
  {/each}
</div>
