<script lang="ts">
  import { getTagsContext } from './useTags'

  export let nodeId = 'root'
  export let parentId = 'root'
  export let depth = 0

  const { tags, maxDepth, dragAction } = getTagsContext()

  $: hasChildren = $tags.some((t) => t.parents?.includes(nodeId))
  $: children = $tags.filter((t) => t.parents?.includes(nodeId))

  function onDragStart(
    e: DragEvent & {
      currentTarget: EventTarget & HTMLLIElement
    }
  ) {
    e.dataTransfer?.setData('text/plain', JSON.stringify({ id: nodeId, parentId }))
  }

  $: descendants = (nodeId: string): string[] => {
    const children = $tags.filter((t) => t.parents?.includes(nodeId))
    const childrenIds = children.map((t) => t.id)
    const childrenDescendants = childrenIds.flatMap(descendants)
    return [...childrenIds, ...childrenDescendants].filter(onlyUnique)
  }

  function onDrop(e: DragEvent & { currentTarget: EventTarget & HTMLElement }, targetId: string) {
    const { id: sourceId, parentId: sourceParentId } = JSON.parse(
      e.dataTransfer?.getData('text/plain') as string
    )
    if (descendants(sourceId).includes(targetId)) return

    $tags = $tags.map((tag) => {
      if (sourceId === targetId) return tag
      if (sourceId !== tag.id) return tag

      if ($dragAction === 'move') {
        const prevParents = tag.parents || []
        const withoutPrevSourceParent = prevParents.filter((id) => id !== sourceParentId)
        const newParents = [...withoutPrevSourceParent, targetId].filter(onlyUnique)
        return { ...tag, parents: newParents }
      }

      if ($dragAction === 'copy') {
        return { ...tag, parents: [...(tag.parents || []), targetId].filter(onlyUnique) }
      }

      return tag
    })
  }

  function onlyUnique<T>(value: T, index: number, array: T[]) {
    return array.indexOf(value) === index
  }
</script>

{#if depth === 0}
  <ul><svelte:self nodeId={'root'} depth={depth + 1} /></ul>
{:else}
  <li
    data-parent-id={parentId}
    data-id={nodeId}
    on:drop|preventDefault|stopPropagation={(e) => onDrop(e, nodeId)}
    on:dragover|preventDefault
    on:dragstart|self={onDragStart}
    draggable={depth > 1}
  >
    {$tags.find((t) => t.id === nodeId)?.value}

    {#if hasChildren && depth < maxDepth}
      <ul class="ml-2">
        {#each children as child}
          <svelte:self nodeId={child.id} depth={depth + 1} parentId={nodeId} />
        {/each}
      </ul>
    {/if}
  </li>
{/if}

<style lang="postcss">
  ul {
    @apply border;
  }
</style>
