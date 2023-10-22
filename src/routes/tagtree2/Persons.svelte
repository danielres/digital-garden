<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import PersonAvatarAndName from './Persons/PersonAvatarAndName.svelte'
  import PersonTraitsTable from './Persons/PersonTraitsTable.svelte'
  import { personClicked } from './events'
  import { getPersonsContext } from './usePersons'

  const { persons } = getPersonsContext()
  const dispatch = createEventDispatcher()
</script>

<div class="flex flex-wrap gap-8">
  {#each $persons as person}
    <div class="min-w-[50%] flex-grow space-y-2">
      <h2>
        <button class="clickable" on:click={() => personClicked(dispatch, person)}>
          <PersonAvatarAndName {person} />
        </button>
      </h2>

      <div class="variant-soft rounded px-4 py-2">
        <PersonTraitsTable {person} on:personNodeClicked />
      </div>
    </div>
  {/each}
</div>
