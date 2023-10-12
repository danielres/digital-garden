<script lang="ts">
  import TraitsList from './TraitsList.svelte'
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
    { kind: 'hobby', personId: 'jill', nodeId: '02', body: 'hobby 02', scale: 4 },
  ]

  setPersonsContext(initPersons, initTraits)
  const { persons } = getPersonsContext()
</script>

<div class="flex flex-wrap">
  {#each $persons as person}
    <div class="min-w-[50%] flex-grow p-2">
      <h2>{person.name}</h2>

      <div class="variant-soft rounded">
        <TraitsList {person} />
      </div>
    </div>
  {/each}
</div>
