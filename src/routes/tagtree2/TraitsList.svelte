<script lang="ts">
  import { Ratings } from '@skeletonlabs/skeleton'
  import { getPersonsContext, type Person } from './usePersons'

  const { persons, traits } = getPersonsContext()
  export let person: Person
  export let traitsKind: 'interest' | 'expertise'
</script>

{#each $traits.filter((t) => t.personId === person.id && t.kind === traitsKind) as interest}
  <div class="flex gap-2">
    <div class="grid gap-2 grid-cols-2">
      <span>{interest.nodeId}</span>
      <Ratings
        bind:value={interest.scale}
        max={5}
        interactive
        spacing="gap-0"
        on:icon={(e) => {
          console.log(e.detail)
        }}
      >
        <svelte:fragment slot="empty">□</svelte:fragment>
        <svelte:fragment slot="half">◧</svelte:fragment>
        <svelte:fragment slot="full">■</svelte:fragment>
      </Ratings>
    </div>
  </div>
{/each}
