<script lang="ts">
  import { Ratings } from '@skeletonlabs/skeleton'
  import { getPersonsContext, setPersonsContext } from './usePersons'
  import TraitsList from './TraitsList.svelte'

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
          <TraitsList {person} traitsKind="interest" />
        </div>

        <div class="p-2 variant-soft">
          <h3>Expertise</h3>
          <TraitsList {person} traitsKind="expertise" />
        </div>
      </div>
    </div>
  {/each}
</div>
