<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import TraitsList from './TraitsList.svelte'
  import { getPersonsContext } from './usePersons'

  const { persons } = getPersonsContext()
  const dispatch = createEventDispatcher()
</script>

<div class="flex flex-wrap gap-4">
  {#each $persons as person}
    <div class="min-w-[50%] flex-grow">
      <h2>
        <button class="clickable" on:click={() => dispatch('personClicked', person)}>
          {person.name}
        </button>
      </h2>

      <div class="variant-soft rounded">
        <TraitsList {person} on:personNodeClicked />
      </div>
    </div>
  {/each}
</div>
