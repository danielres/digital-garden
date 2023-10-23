<script>
  import { page } from '$app/stores'
  import PersonAvatarAndName from '../../../Persons/PersonAvatarAndName.svelte'
  import TraitRating from '../../../TraitRating.svelte'
  import { getPersonsContext } from '../../../usePersons'
  import { getTreeContext } from '../../../useTree'
  import { upperFirst } from '../../../utils/string'

  const { persons, traits } = getPersonsContext()
  const { nodes, edges } = getTreeContext()

  $: personId = $page.params.personId
  $: nodeId = $page.params.nodeId
  $: person = persons.findById(personId)

  $: personTraits = $traits.filter((t) => t.nodeId === nodeId && t.personId === personId)
  $: node = nodes.findById(personTraits[0].nodeId)
</script>

{#if person}
  <div class="space-y-8">
    <div class="space-y-4">
      <h2 class="text-lg flex items-end gap-2">
        <a href="/tagtree2/persons/{person.id}" class="clickable">
          <PersonAvatarAndName {person} />
        </a>
        <span class="opacity-50">{'>'}</span>
        <a href="/tagtree2/topics/{node.id}" class="clickable">{upperFirst(node.value)}</a>
      </h2>

      <div class="text-sm">{@html person?.body}</div>
    </div>

    <div class="space-y-4">
      {#each personTraits as trait}
        <div class="">
          <div class="flex items-center gap-2 justify-between">
            <div class="font-bold">{upperFirst(trait.kind)}:</div>

            <TraitRating {trait} interactive={true} />
          </div>

          <p class="text-sm">{@html trait.body}</p>
        </div>
      {/each}
    </div>

    <hr />

    <div class="text-sm prose text-surface-100">{@html node.body}</div>
  </div>
{:else}
  <div class="alert variant-ghost-error">
    Person with id "
    <b>{personId}</b>
    " not found.
  </div>
{/if}
