<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import TraitRating from '../TraitRating.svelte'
  import { getPersonsContext, type Person } from '../usePersons'
  import { getTreeContext } from '../useTree'
  import { onlyUnique } from '../utils/array'
  import { upperFirst } from '../utils/string'

  const { traits } = getPersonsContext()
  const { nodes } = getTreeContext()

  export let person: Person

  $: personTraits = $traits.filter((t) => t.personId === person.id)
  $: traitsKind = personTraits.map((t) => t.kind).filter(onlyUnique)
  $: traitNodeIds = personTraits.map((t) => t.nodeId).filter(onlyUnique)

  $: colsCount = personTraits.map((t) => t.kind).filter(onlyUnique).length + 1

  const dispatch = createEventDispatcher()
</script>

<div class="grid" style:--colsCount={colsCount}>
  <div class="th">Topic</div>
  {#each traitsKind as kind}
    <div class="th">{upperFirst(kind)}</div>
  {/each}

  {#each traitNodeIds as nodeId}
    <div>
      <button
        class="clickable opacity-90 hover:opacity-100"
        on:click={() => dispatch('personNodeClicked', { nodeId, personId: person.id })}
      >
        {nodes.findById(nodeId).value}
      </button>
    </div>

    {#each traitsKind as kind}
      <div class="">
        <div class="opacity-75 hover:opacity-100 flex h-full">
          {#each $traits.filter((t) => t.personId === person.id && t.nodeId === nodeId && t.kind === kind) as trait}
            <TraitRating {trait} />
          {:else}
            <button
              class="w-full text-left opacity-10"
              on:click={() => traits.add({ kind, personId: person.id, nodeId })}
            >
              <TraitRating
                interactive={false}
                trait={{ scale: 0, personId: person.id, nodeId, kind }}
              />
            </button>
          {/each}
        </div>
      </div>
    {/each}
  {/each}
</div>

<style lang="postcss">
  .grid {
    grid-template-columns: 1fr repeat(calc(var(--colsCount) - 1), auto);
    @apply px-2 py-1;
  }
  .grid > div {
    @apply px-4 py-1;
  }

  .th {
    @apply font-bold text-surface-500;
  }
</style>
