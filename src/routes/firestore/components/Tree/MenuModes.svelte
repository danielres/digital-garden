<script lang="ts">
  import { upperFirst } from '../../utils/string'
  import { getTreeContext } from './treeContext'

  const { mode } = getTreeContext()

  const modes = ['move', 'copy', 'add', 'delete'] as const
</script>

<div class="font-bold text-error-300 w-fit flex gap-2">
  {#each modes as type}
    <button
      class="btn btn-sm rounded"
      class:variant-ghost-error={$mode.type !== type}
      class:variant-filled-error={$mode.type === type}
      class:hover:variant-filled-error={$mode.type === type}
      type="button"
      on:click={() => ($mode = { type })}
    >
      {upperFirst(type)}
    </button>
  {/each}
</div>
