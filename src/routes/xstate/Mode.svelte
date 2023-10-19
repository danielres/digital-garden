<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  let mode = 'MOVE'

  const dispatch = createEventDispatcher()

  $: dispatch('mode', mode)
</script>

<div class="flex gap-4 p-4 variant-ghost">
  <label>
    <input type="radio" bind:group={mode} value="MOVE" />
    <span>Move</span>
  </label>

  <label>
    <input type="radio" bind:group={mode} value="COPY" />
    <span>Copy</span>
  </label>

  <label>
    <input type="radio" bind:group={mode} value="ADD" />
    <span>Add</span>
  </label>
</div>
