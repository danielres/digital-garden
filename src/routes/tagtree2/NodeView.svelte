<script lang="ts">
  import Rating from './Rating.svelte'
  import { getPersonsContext } from './usePersons'
  import type { Node } from './useTree'
  import { upperFirst } from './utils/string'

  export let node: Node
  const { persons, traits } = getPersonsContext()

  const groupByKey = (list, key) =>
    list.reduce((hash, obj) => ({ ...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj) }), {})

  $: details = groupByKey(
    $traits.filter((t) => t.nodeId === node.id),
    'personId'
  )
</script>

<div class="space-y-4">
  <h2 class="!font-normal text-xl">{upperFirst(node.value)}</h2>
  <div class="opacity-75 text-sm">{node.body}</div>

  {#each Object.entries(details) as [personId, traits]}
    <div class="">
      <h2 class="">{upperFirst(persons.findById(personId).name)}</h2>
      <div class=" variant-ghost p-4">
        {#each traits as trait}
          <div>
            <div class="grid grid-cols-2 items-center gap-2">
              <div class="">{upperFirst(trait.kind)}:</div>
              <Rating {trait} interactive={false} />
            </div>

            <div>{trait.body}</div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>
