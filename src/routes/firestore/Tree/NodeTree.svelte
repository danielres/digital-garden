<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import * as Icons from '../Icons'
  import { getAppContext, type Edge, type Topic } from '../appContext'
  import { onlyUnique } from '../utils/array'
  import { upperFirst } from '../utils/string'
  import { getTreeContext } from './treeContext'

  export let depth = 0
  export let nodeId = 'root'
  export let parentId = 'root'

  const dispatch = createEventDispatcher()

  const maxDepth = 5
  const { topics: nodes, edges } = getAppContext()
  const { mode } = getTreeContext()

  type DragEventCustom = DragEvent & {
    currentTarget: EventTarget & HTMLLIElement
  }

  function getDescendants(nodeId: Topic['id'], edges: Edge[]): string[] {
    const children = edges.filter((e) => e.parentId === nodeId)
    const childrenIds = children.map((e) => e.childId)
    const childrenDescendants = childrenIds.flatMap((id) => getDescendants(id, edges))
    return [...childrenIds, ...childrenDescendants].filter(onlyUnique)
  }

  function onDragStart(e: DragEventCustom) {
    e.dataTransfer?.setData('text/plain', JSON.stringify({ id: nodeId, parentId }))
  }

  function onDrop(e: DragEventCustom, targetId: string) {
    const source = JSON.parse(e.dataTransfer?.getData('text/plain') as string)

    if (getDescendants(source.id, $edges).includes(targetId)) return // can't drop on descendant

    $edges.forEach((edge) => {
      if (source.id !== edge.childId) return // not the edge we're looking for
      if (source.id === targetId) return // can't drop on self
      const id = edge.childId
      const newParentId = targetId
      if ($mode.type === 'copy') return dispatch('copy', { id, newParentId }) // copy the node under new parent
      if ($mode.type === 'move') return dispatch('move', { id, newParentId }) // move the node under new parent
    })
  }
</script>

{#if depth === 0}
  <ul>
    <svelte:self
      on:nodeClicked
      on:newNode
      on:copy
      on:move
      on:delete
      nodeId={'root'}
      depth={depth + 1}
    />
  </ul>
{:else}
  {@const nodeValue = $nodes.find((n) => n.id === nodeId)?.name}

  <li
    data-parent-id={parentId}
    data-id={nodeId}
    on:drop|preventDefault|stopPropagation={(e) => onDrop(e, nodeId)}
    on:dragover|preventDefault
    on:dragstart|self={onDragStart}
    draggable={['move', 'copy'].includes($mode.type) && depth > 1}
  >
    {#if nodeId === 'root'}
      <span class="flex gap-1 items-center">
        <span class="root opacity-75 text-sm">[Root]</span>
        {#if $mode.type === 'add'}
          <button
            on:click={() =>
              ($mode = { type: 'add.parentSelected', parentId: nodeId, inputText: '' })}
            class="variant-ghost-success w-6 h-6 rounded-full"
          >
            +
          </button>
        {/if}
      </span>
    {:else}
      <div class="flex items-center gap-1">
        <button
          on:click={() => dispatch('nodeClicked', nodeId)}
          class="clickable flex items-center gap-1 hover:text-white"
        >
          <span class="opacity-50 -mt-2"><Icons.TreeAngle /></span>
          {nodeValue}
        </button>

        {#if $mode.type === 'add'}
          <button
            on:click={() => {
              $mode = { type: 'add.parentSelected', parentId: nodeId, inputText: '' }
            }}
            class="variant-ghost-success w-6 h-6 rounded-full"
          >
            +
          </button>
        {/if}

        {#if $mode.type === 'delete' && nodes.getChildren(nodeId).length === 0}
          <button
            class="variant-ghost-error w-6 h-6 rounded-full"
            on:click={() => dispatch('delete', { nodeId })}
          >
            -
          </button>
        {/if}
      </div>
    {/if}

    {#if $mode.type === 'add.parentSelected' || (depth <= maxDepth && $edges.some((e) => e.parentId === nodeId))}
      <ul class="ml-4">
        {#if $mode.type === 'add.parentSelected' && $mode.parentId === nodeId}
          <li>
            <div class="flex items-center gap-1">
              <span class="opacity-50 -mt-2"><Icons.TreeAngle /></span>

              <form
                on:submit|preventDefault={() => {
                  if ($mode.type !== 'add.parentSelected') return
                  dispatch('newNode', { name: $mode.inputText, parentId: $mode.parentId })
                  $mode = { type: 'add' }
                }}
                class="flex items-center gap-2"
              >
                <!-- svelte-ignore a11y-autofocus -->
                <input
                  autofocus
                  class="input w-40 p-0 rounded px-1 py-0"
                  type="text"
                  bind:value={$mode.inputText}
                  on:input={() => {
                    if ('inputText' in $mode) $mode.inputText = upperFirst($mode.inputText)
                  }}
                />

                <button
                  type="submit"
                  class="rounded-full variant-ghost-success text-success-600-300-token w-6 h-6 flex items-center justify-center"
                >
                  v
                </button>

                <button
                  type="button"
                  on:click={() => ($mode = { type: 'add' })}
                  class="rounded-full w-6 h-6 flex items-center justify-center"
                >
                  x
                </button>
              </form>
            </div>
          </li>
        {/if}
        {#each $edges.filter((e) => e.parentId === nodeId) as edge}
          <svelte:self
            on:nodeClicked
            on:newNode
            on:copy
            on:move
            on:delete
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
