<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import PersonTraitsTable from './Persons/PersonTraitsTable.svelte'
  import { getPersonsContext } from './usePersons'
  import { Avatar } from '@skeletonlabs/skeleton'

  const { persons } = getPersonsContext()
  const dispatch = createEventDispatcher()
</script>

<div class="flex flex-wrap gap-8">
  {#each $persons as person}
    <div class="min-w-[50%] flex-grow space-y-2">
      <h2>
        <button
          class="clickable flex items-end gap-2"
          on:click={() => dispatch('personClicked', person)}
        >
          <Avatar src={person.picture} width="w-8" />
          <span>{person.name}</span>
        </button>
      </h2>

      <div class="variant-soft rounded">
        <PersonTraitsTable {person} on:personNodeClicked />
      </div>
    </div>
  {/each}
</div>
