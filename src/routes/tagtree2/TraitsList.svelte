<script lang="ts">
  import { Ratings } from '@skeletonlabs/skeleton'
  import * as Icons from './Icons'
  import { getPersonsContext, type Person } from './usePersons'
  import { getTreeContext } from './useTree'
  import { onlyUnique } from './utils/array'
  import { upperFirst } from './utils/string'

  const { traits } = getPersonsContext()
  const { nodes } = getTreeContext()

  export let person: Person

  $: personTraits = $traits.filter((t) => t.personId === person.id)
  $: traitsKind = personTraits.map((t) => t.kind).filter(onlyUnique)
  $: traitNodeIds = personTraits.map((t) => t.nodeId).filter(onlyUnique)

  $: colsCount = personTraits.map((t) => t.kind).filter(onlyUnique).length + 1
</script>

<div class="grid" style:--colsCount={colsCount}>
  <div class="th">Topic</div>
  {#each traitsKind as kind}
    <div class="th">{upperFirst(kind)}</div>
  {/each}

  {#each traitNodeIds as nodeId}
    <div>{nodes.findById(nodeId).value}</div>
    {#each traitsKind as kind}
      <div class="flex items-center">
        <div class="opacity-75 hover:opacity-100 flex items-center gap-2">
          {#each $traits.filter((t) => t.personId === person.id && t.nodeId === nodeId && t.kind === kind) as trait}
            <Ratings
              bind:value={trait.scale}
              max={5}
              interactive
              spacing="gap-0.5"
              on:icon={(e) => (trait.scale = e.detail.index)}
            >
              <svelte:fragment slot="empty"><Icons.SquareEmpty /></svelte:fragment>
              <svelte:fragment slot="half"><Icons.SquareHalved /></svelte:fragment>
              <svelte:fragment slot="full"><Icons.Square /></svelte:fragment>
            </Ratings>
            <button
              class="opacity-25 hover:opacity-100"
              on:click={() =>
                confirm(`Are you sure you want to remove this ${trait.kind} for ${person.name}?`) &&
                traits.remove(trait)}
            >
              <Icons.Xmark />
            </button>
          {:else}
            -
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
