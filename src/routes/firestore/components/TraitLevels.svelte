<script lang="ts">
  import type { Trait } from '../appContext'

  export let trait: Trait
</script>

<div class="flex gap-4 text-sm opacity-75">
  {#each Object.entries(trait.levels) as [kind, value]}
    <span>{kind}:</span>
    <span>{value}</span>
  {/each}
</div>
