import { getContext, setContext } from 'svelte'
import { writable, type Writable } from 'svelte/store'

export type Mode =
  | { type: 'view' }
  | { type: 'move' }
  | { type: 'copy' }
  | { type: 'add' }
  | { type: 'add.parentSelected'; parentId: string; inputText: string }
  | { type: 'delete' }

type TreeContext = {
  mode: Writable<Mode>
}

export function setTreeContext() {
  const mode = writable<Mode>({ type: 'view' })
  const context: TreeContext = { mode }
  setContext('treeContext', context)
}

export function getTreeContext() {
  return getContext('treeContext') as TreeContext
}
