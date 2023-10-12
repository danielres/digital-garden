<script lang="ts">
  import { Ratings } from '@skeletonlabs/skeleton'
  import * as Icons from './Icons'
  import { getPersonsContext, type Person, type Trait } from './usePersons'

  const { traits } = getPersonsContext()
  export let person: Person
  export let traitsKind: Trait['kind']
</script>

{#each $traits.filter((t) => t.personId === person.id && t.kind === traitsKind) as trait}
  <div class="flex gap-2">
    <div class="grid gap-2 grid-cols-2">
      <span>{trait.nodeId}</span>

      <div class="flex gap-2 items-center">
        <div class="opacity-75 hover:opacity-100">
          <Ratings
            bind:value={trait.scale}
            max={5}
            interactive
            spacing="gap-1"
            on:icon={(e) => (trait.scale = e.detail.index)}
          >
            <svelte:fragment slot="empty"><Icons.SquareEmpty /></svelte:fragment>
            <svelte:fragment slot="half"><Icons.SquareHalved /></svelte:fragment>
            <svelte:fragment slot="full"><Icons.Square /></svelte:fragment>
          </Ratings>
        </div>

        <button
          class="opacity-25 hover:opacity-100"
          on:click={() =>
            confirm(`Are you sure you want to remove this ${traitsKind} for ${person.name}?`) &&
            traits.remove(trait)}
        >
          <Icons.Xmark />
        </button>
      </div>
    </div>
  </div>
{/each}
