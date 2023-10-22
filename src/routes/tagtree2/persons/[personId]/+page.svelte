<script lang="ts">
  import { page } from '$app/stores'
  import PersonAvatarAndName from '../../Persons/PersonAvatarAndName.svelte'
  import PersonTraitsTable from '../../Persons/PersonTraitsTable.svelte'
  import { getPersonsContext } from '../../usePersons'

  const { persons } = getPersonsContext()

  $: personId = $page.params.personId
  $: person = persons.findById(personId)
</script>

{#if person}
  <div class="space-y-4 text-lg">
    <PersonAvatarAndName {person} />
    <div class="text-sm">{@html person?.body}</div>
  </div>

  <div class="variant-soft rounded">
    <PersonTraitsTable {person} />
  </div>
{:else}
  <div class="alert variant-ghost-error">
    Person with id "
    <b>{personId}</b>
    " not found.
  </div>
{/if}
