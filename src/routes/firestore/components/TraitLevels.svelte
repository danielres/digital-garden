<script lang="ts">
  import type { Trait } from '../appContext'

  export let trait: Trait
  export let isEditing = false
</script>

<div class="flex gap-4 text-sm opacity-75">
  {#each Object.entries(trait.levels) as [kind, value]}
    <span>{kind}:</span>

    {#if isEditing}
      <input
        type="text"
        name="traits.{trait.id}.levels.{kind}"
        class="textarea p-0 w-6 text-sm text-center"
        {value}
      />
    {:else}
      <span>{value}</span>
    {/if}
  {/each}
</div>
