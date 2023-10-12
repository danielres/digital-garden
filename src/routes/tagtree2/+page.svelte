<script lang="ts">
  import { fade } from 'svelte/transition'
  import Tree from './Tree.svelte'
  import { getTreeContext, setTreeContext, type Edge, type Node } from './useTree'

  const nodes: Node[] = [
    { value: 'root', id: 'root', body: '' },
    { value: 'node1', id: '01', body: 'Node1 body' },
    { value: 'node2', id: '02', body: 'Node2 body' },
    { value: 'node3', id: '03', body: 'Node3 body' },
  ]

  const edges: Edge[] = [
    { parentId: 'root', childId: '01' },
    { parentId: 'root', childId: '02' },
    { parentId: '02', childId: '03' },
  ]

  setTreeContext(nodes, edges)
  const { dragAction, nodes: nodesStore } = getTreeContext()

  let currentNodeId: string | undefined = undefined
  $: currentNode = $nodesStore.find((n) => n.id === currentNodeId)

  function viewNode({ nodeId, parentId }: { nodeId: string; parentId: string }) {
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

{#if currentNode}
  <div
    class="fixed inset-8 md:inset-x-auto md:right-8 md:w-full md:max-w-md variant-ghost backdrop-blur stack"
    transition:fade={{ duration: 100 }}
  >
    <div class="space-y-2 p-4">
      <h2 class="!font-normal text-xl">{currentNode.value}</h2>
      <p>{currentNode.body}</p>
    </div>
    <div class="justify-self-end self-start">
      <button
        class="px-2 text-3xl opacity-30 hover:opacity-80"
        on:click={() => (currentNodeId = undefined)}
      >
        x
      </button>
    </div>
  </div>
{/if}

<Tree on:nodeClicked={({ detail }) => viewNode(detail)} />
