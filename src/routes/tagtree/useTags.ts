import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

export type Tag = { value: string; id: string; parents?: string[] }

type DragAction = 'move' | 'copy'

export function setTagsContext(tags: Tag[], maxDepth = 5) {
  const tagsStore = writable(tags)
  const dragAction = writable<DragAction>('move')

  return setContext('tags', {
    tags: tagsStore,
    maxDepth,
    dragAction,
  })
}

export function getTagsContext(): ReturnType<typeof setTagsContext> {
  return getContext('tags')
}
