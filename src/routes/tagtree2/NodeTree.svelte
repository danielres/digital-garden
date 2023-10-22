<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import * as Icons from './Icons'
  import { nodeClicked } from './events'
  import { getTreeContext } from './useTree'
  import { onlyUniqueObjects } from './utils/array'

  export let depth = 0
  export let nodeId = 'root'
  export let parentId = 'root'

  const context = getTreeContext()
  const { nodes, edges, maxDepth, dragAction, getDescendants } = context

  type DragEventCustom = DragEvent & {
    currentTarget: EventTarget & HTMLLIElement
  }

  function onDragStart(e: DragEventCustom) {
    e.dataTransfer?.setData('text/plain', JSON.stringify({ id: nodeId, parentId }))
  }

  function onDrop(e: DragEventCustom, targetId: string) {
    const source = JSON.parse(e.dataTransfer?.getData('text/plain') as string)

    if (getDescendants(source.id, $edges).includes(targetId)) return // can't drop on descendant

    $edges = $edges
      .map((edge) => {
        if (source.id !== edge.childId) return edge // not the edge we're looking for
        if (source.id === targetId) return edge // can't drop on self
        if ($dragAction === 'copy') return [edge, { ...edge, parentId: targetId }]
        return { ...edge, parentId: targetId } // move the node under new parent
      })
      .flat()
      .filter(onlyUniqueObjects)
  }

  const dispatch = createEventDispatcher()
</script>

{#if depth === 0}
  <ul>
    <svelte:self on:nodeClicked nodeId={'root'} depth={depth + 1} />
  </ul>
{:else}
  {@const nodeValue = $nodes.find((n) => n.id === nodeId)?.value}

  <li
    data-parent-id={parentId}
    data-id={nodeId}
    on:drop|preventDefault|stopPropagation={(e) => onDrop(e, nodeId)}
    on:dragover|preventDefault
    on:dragstart|self={onDragStart}
    draggable={depth > 1}
  >
    {#if nodeId === 'root'}
      <span class="root opacity-75 text-sm">[Root]</span>
    {:else}
      <button
        on:click={() => nodeClicked(dispatch, nodeId)}
        class="clickable flex items-center gap-1 hover:text-white"
      >
        <span class="opacity-50 -mt-2"><Icons.TreeAngle /></span>
        {nodeValue}
      </button>
    {/if}

    {#if depth <= maxDepth && $edges.some((e) => e.parentId === nodeId)}
      <ul class="ml-4">
        {#each $edges.filter((e) => e.parentId === nodeId) as edge}
          <svelte:self
            on:nodeClicked
            nodeId={edge.childId}
            depth={depth + 1}
            parentId={edge.parentId}
          />
        {/each}
      </ul>
    {/if}
  </li>
{/if}

<style lang="postcss">
  li {
    @apply select-none;
  }
  .root {
    font-variant: small-caps;
  }
</style>
