<script lang="ts">
  import { Ratings } from '@skeletonlabs/skeleton'
  import { getPersonsContext, type Trait } from './usePersons'
  import * as Icons from './Icons'

  export let trait: Trait
  export let interactive = true

  const { traits, persons } = getPersonsContext()

  const personName = persons.findById(trait.personId)?.name

  const confirmMessage = `Are you sure you want to remove this ${trait.kind} for ${
    personName ?? trait.personId
  }?`
</script>

<div class="flex gap-2 w-fit">
  <Ratings
    bind:value={trait.scale}
    max={5}
    {interactive}
    spacing="gap-0.5"
    on:icon={(e) => (trait.scale = e.detail.index)}
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
