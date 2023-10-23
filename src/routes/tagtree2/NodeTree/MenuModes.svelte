<script lang="ts">
  import { getTreeContext } from '../useTree'

  const { mode } = getTreeContext()
</script>

<div class="flex gap-4">
  <label>
    <input
      class="radio"
      type="radio"
      value={'move'}
      on:click={() => ($mode = { type: 'move' })}
      checked={$mode.type === 'move'}
    />
    <span>Move</span>
  </label>

  <label>
    <input
      class="radio"
      type="radio"
      on:click={() => ($mode = { type: 'copy' })}
      checked={$mode.type === 'copy'}
    />
    <span>Copy</span>
  </label>

  <label>
    <input
      class="radio"
      type="radio"
      on:click={() => ($mode = { type: 'add' })}
      checked={$mode.type.startsWith('add')}
    />
    <span>Add</span>
  </label>
</div>
