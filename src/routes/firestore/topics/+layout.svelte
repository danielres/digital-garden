<script lang="ts">
  import Tree from '../Tree.svelte'
</script>

<div class="grid grid-cols-2">
  <div>
    <Tree />
  </div>

  <div>
    <slot />
  </div>
</div>
