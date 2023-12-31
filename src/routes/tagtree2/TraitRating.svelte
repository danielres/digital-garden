<script lang="ts">
  import { Ratings } from '@skeletonlabs/skeleton'
  import * as Icons from './Icons'
  import type { Trait } from './data'
  import { getPersonsContext } from './usePersons'

  export let trait: Pick<Trait, 'kind' | 'nodeId' | 'personId' | 'scale'>
  export let interactive = true

  const { traits, persons } = getPersonsContext()

  const personName = persons.findById(trait.personId)?.name

  const confirmMessage = `Are you sure you want to remove this ${trait.kind} for ${
    personName ?? trait.personId
  }?`
</script>

<div class="flex gap-2 w-fit">
  <Ratings
    value={trait.scale}
    max={5}
    {interactive}
    spacing="gap-[1px]"
    on:icon={(e) => {
      traits.update(($traits) => {
        const index = $traits.findIndex(
          (t) => t.personId === trait.personId && t.nodeId === trait.nodeId && t.kind === trait.kind
        )
        $traits[index].scale = e.detail.index
        return $traits
      })
    }}
  >
    <svelte:fragment slot="empty"><Icons.SquareEmpty /></svelte:fragment>
    <svelte:fragment slot="half"><Icons.SquareHalved /></svelte:fragment>
    <svelte:fragment slot="full"><Icons.Square /></svelte:fragment>
  </Ratings>

  {#if interactive}
    <button
      class="opacity-25 hover:opacity-100"
      on:click={() => confirm(confirmMessage) && traits.remove(trait)}
    >
      <Icons.Xmark />
    </button>
  {/if}
</div>
