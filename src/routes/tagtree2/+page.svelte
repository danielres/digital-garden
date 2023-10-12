<script lang="ts">
  import { fade } from 'svelte/transition'
  import * as Icons from './Icons'
  import NodeView from './NodeView.svelte'
  import Persons from './Persons.svelte'
  import Tree from './Tree.svelte'
  import * as data from './data'
  import { setPersonsContext } from './usePersons'
  import { getTreeContext, setTreeContext } from './useTree'

  setPersonsContext(data.persons, data.traits)

  setTreeContext(data.nodes, data.edges)
  const { dragAction, nodes } = getTreeContext()

  let currentNodeId: string | undefined = undefined
  $: currentNode = $nodes.find((n) => n.id === currentNodeId)

  function viewNode({ nodeId }: { nodeId: string; parentId: string }) {
    currentNodeId = nodeId
  }
</script>

<div class="grid grid-cols-2 max-w-7xl mx-auto gap-8 my-8">
  <div class="">
    <Persons />
  </div>

  <div>
    <h2>Topics</h2>
    <div class="space-y-4 variant-soft p-4">
      <div class="flex gap-4">
        <label>
          <input class="radio" type="radio" bind:group={$dragAction} value="move" />
          <span>Move</span>
        </label>
        <label>
          <input class="radio" type="radio" bind:group={$dragAction} value="copy" />
          <span>Copy</span>
        </label>
      </div>

      <div class="">
        <Tree on:nodeClicked={({ detail }) => viewNode(detail)} />
      </div>
    </div>
  </div>
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
