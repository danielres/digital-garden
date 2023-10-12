<script lang="ts">
  import type { Node } from './useTree'
  export let node: Node
</script>

<div class="space-y-2 p-4">
  <h2 class="!font-normal text-xl">{node.value}</h2>
  <p>{node.body}</p>
</div>
