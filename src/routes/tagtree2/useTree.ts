import { getContext, setContext } from 'svelte'
import { writable } from 'svelte/store'
import type { Edge, Node } from './data'
import { onlyUnique } from './utils/array'
import { slugify } from './utils/string'

type Mode =
  | { type: 'move' }
  | { type: 'copy' }
  | { type: 'add' }
  | { type: 'add.parentSelected'; parentId: Node['id']; inputText: string }

export function setTreeContext(nodes: Node[], edges: Edge[], maxDepth = 5) {
  const edgesStore = writable(edges)

  const nodesStore = {
    ...writable(nodes),

    findById(id: Node['id']) {
      return nodes.find((n) => n.id === id) ?? { value: id, id, body: '' }
    },

    add({ value, parentId }: { value: Node['value']; parentId: Node['id'] }) {
      const newNode = { value, id: slugify(value), body: '' }
      nodesStore.update((nodes) => [...nodes, newNode])
      edgesStore.update((edges) => [...edges, { parentId, childId: newNode.id }])
    },
  }
  const mode = writable<Mode>({ type: 'move' })

  return setContext('nodes', {
    nodes: nodesStore,
    edges: edgesStore,
    maxDepth,
    mode,
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
