<script lang="ts">
  import { page } from '$app/stores'
  import PersonAvatarAndName from '../../Persons/PersonAvatarAndName.svelte'
  import TraitRating from '../../TraitRating.svelte'
  import { getPersonsContext } from '../../usePersons'
  import { getTreeContext } from '../../useTree'
  import { groupByKey } from '../../utils/object'
  import { upperFirst } from '../../utils/string'

  const { persons, traits } = getPersonsContext()

  $: node = nodes.findById($page.params.nodeId)

  $: details = groupByKey(
    $traits.filter((t) => t.nodeId === node.id),
    'personId'
  )

  const { nodes } = getTreeContext()
</script>

<div class="space-y-8">
  <div class="space-y-2">
    <h2 class="text-lg">{upperFirst(node.value)}</h2>
    <div class="opacity-75 prose-sm text-surface-100 leading-snug">{@html node.body}</div>
  </div>

  <div class="space-y-8">
    {#each Object.entries(details) as [personId, traits]}
      {@const person = persons.findById(personId)}

      <div class="space-y-2">
        <h2>
          <a href="/tagtree2/persons/{person?.id}" class="clickable">
            <PersonAvatarAndName {person} />
          </a>
        </h2>
        <div class="variant-ghost p-4 space-y-4">
          {#each traits as trait}
            <div>
              <div class="flex justify-between items-center">
                <div class="font-bold">{upperFirst(trait.kind)}</div>
                <TraitRating bind:trait interactive={true} />
              </div>

              <div class="text-sm">{trait.body}</div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
