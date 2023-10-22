<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton'
  import type { Person } from '../data'
  import { upperFirst } from '../utils/string'

  export let person: Person | undefined
</script>

{#if person}
  <div class="flex gap-2 items-end">
    <Avatar width="w-8" src={person.picture} />
    <span class="font-bold">{upperFirst(person.name)}</span>
  </div>
{:else}
  <div>Person not found</div>
{/if}
