<script lang="ts">
  import PersonAvatarAndName from './Persons/PersonAvatarAndName.svelte'
  import { createEventDispatcher } from 'svelte'
  import TraitRating from './TraitRating.svelte'
  import type { Node } from './data'
  import { getPersonsContext } from './usePersons'
  import { groupByKey } from './utils/object'
  import { upperFirst } from './utils/string'
  import { Avatar } from '@skeletonlabs/skeleton'

  export let node: Node
  const { persons, traits } = getPersonsContext()

  $: details = groupByKey(
    $traits.filter((t) => t.nodeId === node.id),
    'personId'
  )

  const dispatch = createEventDispatcher()
</script>

<div class="space-y-8">
  <div class="space-y-2">
    <h2 class="!font-normal text-xl">{upperFirst(node.value)}</h2>
    <div class="opacity-75 prose-sm text-surface-100 leading-snug">{@html node.body}</div>
  </div>

  <div class="space-y-8">
    {#each Object.entries(details) as [personId, traits]}
      {@const person = persons.findById(personId)}

      <div class="space-y-2">
        <h2>
          <button class="clickable" on:click={() => dispatch('personClicked', person)}>
            <PersonAvatarAndName {person} />
          </button>
        </h2>
        <div class="variant-ghost p-4 space-y-4">
          {#each traits as trait}
            <div>
              <div class="flex justify-between items-center">
                <div class="font-bold">{upperFirst(trait.kind)}</div>
                <TraitRating {trait} interactive={false} />
              </div>

              <div class="text-sm">{trait.body}</div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
