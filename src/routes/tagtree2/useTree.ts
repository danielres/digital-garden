import { getContext, setContext } from 'svelte'
import { writable } from 'svelte/store'

export type Node = { value: string; id: string }
export type Edge = { parentId: string; childId: string }

type DragAction = 'move' | 'copy'

export function setTreeContext(nodes: Node[], edges: Edge[], maxDepth = 5) {
  const nodesStore = writable(nodes)
  const edgesStore = writable(edges)
  const dragAction = writable<DragAction>('move')

  return setContext('nodes', {
    nodes: nodesStore,
    edges: edgesStore,
    maxDepth,
    dragAction,
  })
}

export function getTreeContext(): ReturnType<typeof setTreeContext> {
  return getContext('nodes')
}
