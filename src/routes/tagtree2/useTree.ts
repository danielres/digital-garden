import { getContext, setContext } from 'svelte'
import { writable } from 'svelte/store'
import { onlyUnique } from './utils/array'
import type { Edge, Node } from './data'

type DragAction = 'move' | 'copy'

export function setTreeContext(nodes: Node[], edges: Edge[], maxDepth = 5) {
  const nodesStore = {
    ...writable(nodes),

    findById(id: Node['id']) {
      return nodes.find((n) => n.id === id) ?? { value: id, id, body: '' }
    },
  }
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
