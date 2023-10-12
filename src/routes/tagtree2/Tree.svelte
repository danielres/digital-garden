<script lang="ts">
  import { getTreeContext } from './useTree'
  import { onlyUnique, onlyUniqueObjects } from './utils/array'

  export let depth = 0
  export let nodeId = 'root'
  export let parentId = 'root'

  const context = getTreeContext()
  const { nodes, edges, maxDepth, dragAction } = context

  type DragEventCustom = DragEvent & {
    currentTarget: EventTarget & HTMLLIElement
  }

  function onDragStart(e: DragEventCustom) {
    e.dataTransfer?.setData('text/plain', JSON.stringify({ id: nodeId, parentId }))
  }

  function onDrop(e: DragEventCustom, targetId: string) {
    const source = JSON.parse(e.dataTransfer?.getData('text/plain') as string)

    if (getDescendants(source.id).includes(targetId)) return // can't drop on descendant

    $edges = $edges
      .map((edge) => {
        if (source.id !== edge.childId) return edge // not the edge we're looking for
        if (source.id === targetId) return edge // can't drop on self
        if ($dragAction === 'copy') return [edge, { ...edge, parentId: targetId }]
        return { ...edge, parentId: targetId } // move the node under new parent
      })
      .flat()
      .filter(onlyUniqueObjects)

    function getDescendants(nodeId: string): string[] {
      const children = $edges.filter((e) => e.parentId === nodeId)
      const childrenIds = children.map((e) => e.childId)
      const childrenDescendants = childrenIds.flatMap(getDescendants)
      return [...childrenIds, ...childrenDescendants].filter(onlyUnique)
    }
  }
</script>

{#if depth === 0}
  <ul>
    <svelte:self nodeId={'root'} depth={depth + 1} />
  </ul>
{:else}
  <li
    data-parent-id={parentId}
    data-id={nodeId}
    on:drop|preventDefault|stopPropagation={(e) => onDrop(e, nodeId)}
    on:dragover|preventDefault
    on:dragstart|self={onDragStart}
    draggable={depth > 1}
  >
    {$nodes.find((n) => n.id === nodeId)?.value}

    {#if depth <= maxDepth && $edges.some((e) => e.parentId === nodeId)}
      <ul>
        {#each $edges.filter((e) => e.parentId === nodeId) as edge}
          <svelte:self nodeId={edge.childId} depth={depth + 1} parentId={edge.parentId} />
        {/each}
      </ul>
    {/if}
  </li>
{/if}

<style lang="postcss">
  ul {
    @apply border m-2 px-2 py-1;
  }
  li {
    @apply cursor-pointer select-none;
  }
</style>
