<script lang="ts">
  import Tree from './Tree.svelte'
  import { setTreeContext, type Edge, type Node, getTreeContext } from './useTree'

  const nodes: Node[] = [
    { value: 'root', id: 'root' },
    { value: 'node1', id: '01' },
    { value: 'node2', id: '02' },
    { value: 'node3', id: '03' },
  ]

  const edges: Edge[] = [
    { parentId: 'root', childId: '01' },
    { parentId: 'root', childId: '02' },
    { parentId: '02', childId: '03' },
  ]

  setTreeContext(nodes, edges)
  const { dragAction } = getTreeContext()
</script>

<div class="m-4 flex gap-4">
  <label>
    <input class="radio" type="radio" bind:group={$dragAction} value="move" />
    <span>Move</span>
  </label>

  <label>
    <input class="radio" type="radio" bind:group={$dragAction} value="copy" />
    <span>Copy</span>
  </label>
</div>

<Tree />
