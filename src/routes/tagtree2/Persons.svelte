<script lang="ts">
  import { Ratings } from '@skeletonlabs/skeleton'
  import { getPersonsContext, setPersonsContext } from './usePersons'

  const initPersons = [
    { id: 'tom', name: 'Tom' },
    { id: 'jill', name: 'Jill' },
  ]

  const initTraits = [
    { kind: 'interest', personId: 'tom', nodeId: '01', body: '01 is great', scale: 5 },
    { kind: 'interest', personId: 'tom', nodeId: '02', body: '02 is meh', scale: 3.5 },
    { kind: 'expertise', personId: 'tom', nodeId: '02', body: 'pro 02', scale: 5 },
    { kind: 'interest', personId: 'jill', nodeId: '01', body: '01 is ok', scale: 4 },
    { kind: 'expertise', personId: 'jill', nodeId: '02', body: 'newbie 02', scale: 1 },
  ]

  setPersonsContext(initPersons, initTraits)
  const { persons, traits } = getPersonsContext()
</script>

<h1>Persons</h1>
<div class="space-y-2">
  {#each $persons as person}
    <div class="p-2">
      <h2>{person.name}</h2>

      <div class="grid grid-cols-2">
        <div class="p-2 variant-soft">
          <h3>Interest</h3>
          {#each $traits.filter((t) => t.personId === person.id && t.kind === 'interest') as interest}
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
        </div>
        <div class="p-2 variant-soft">
          <h3>Expertise</h3>
          {#each $traits.filter((t) => t.personId === person.id && t.kind === 'expertise') as expertise}
            <div class="flex gap-2">
              <div class="grid gap-2 grid-cols-2">
                <span>{expertise.nodeId}</span>
                <Ratings
                  bind:value={expertise.scale}
                  max={5}
                  interactive
                  spacing="gap-0"
                  on:icon={() => {}}
                >
                  <svelte:fragment slot="empty">□</svelte:fragment>
                  <svelte:fragment slot="half">◧</svelte:fragment>
                  <svelte:fragment slot="full">■</svelte:fragment>
                </Ratings>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>
