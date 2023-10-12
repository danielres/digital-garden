<script lang="ts">
  import { fade } from 'svelte/transition'
  import Tree from './Tree.svelte'
  import Persons from './Persons.svelte'
  import { getTreeContext, setTreeContext, type Edge, type Node } from './useTree'
  import NodeView from './NodeView.svelte'
  import * as Icons from './Icons'

  const initNodes: Node[] = [
    { value: 'root', id: 'root', body: '' },
    { value: 'node1', id: '01', body: 'Node1 body' },
    { value: 'node2 Lorem', id: '02', body: 'Node2 body' },
    { value: 'node3', id: '03', body: 'Node3 body' },
  ]

  const initEdges: Edge[] = [
    { parentId: 'root', childId: '01' },
    { parentId: 'root', childId: '02' },
    { parentId: '02', childId: '03' },
  ]

  setTreeContext(initNodes, initEdges)
  const { dragAction, nodes } = getTreeContext()

  let currentNodeId: string | undefined = '01'
  $: currentNode = $nodes.find((n) => n.id === currentNodeId)

  function viewNode({ nodeId }: { nodeId: string; parentId: string }) {
    currentNodeId = nodeId
  }
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

<div class="space-y-4 p-4">
  <Tree on:nodeClicked={({ detail }) => viewNode(detail)} />

  <hr />

  <Persons />
</div>

{#if currentNode}
  <div
    class="stack fixed inset-8 md:inset-x-auto md:right-8 md:w-full md:max-w-md variant-ghost backdrop-blur"
    transition:fade={{ duration: 100 }}
  >
    <NodeView node={currentNode} />

    <button
      class="justify-self-end self-start p-2 text-3xl opacity-30 hover:opacity-80"
      on:click={() => (currentNodeId = undefined)}
    >
      <Icons.Xmark />
    </button>
  </div>
{/if}
