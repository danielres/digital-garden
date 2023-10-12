import { getContext, setContext } from 'svelte'
import { writable } from 'svelte/store'
import { onlyUnique } from './utils/array'

export type Node = { value: string; id: string; body: string }
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
    getDescendants,
  })
}

export function getTreeContext(): ReturnType<typeof setTreeContext> {
  return getContext('nodes')
}

function getDescendants(nodeId: string, edges: Edge[]): string[] {
  const children = edges.filter((e) => e.parentId === nodeId)
  const childrenIds = children.map((e) => e.childId)
  const childrenDescendants = childrenIds.flatMap((id) => getDescendants(id, edges))
  return [...childrenIds, ...childrenDescendants].filter(onlyUnique)
}