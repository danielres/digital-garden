import { getContext, setContext } from 'svelte'
import { writable } from 'svelte/store'
import type { Content, ContentTrait } from './data'

export function setContentsContext(contents: Content[], contentTraits: ContentTrait[]) {
  const contentsStore = {
    ...writable(contents),

    findById(id: Content['id']) {
      return contents.find((p) => p.id === id)
    },
  }

  const contentTraitsStore = {
    ...writable(contentTraits),

    remove({ contentId, nodeId }: Pick<ContentTrait, 'contentId' | 'nodeId'>) {
      contentTraitsStore.update((contentTraits) =>
        contentTraits.filter((t) => !(t.contentId === contentId && t.nodeId === nodeId))
      )
    },

    updateScale({ contentId, nodeId }: Pick<ContentTrait, 'contentId' | 'nodeId'>, scale: number) {
      contentTraitsStore.update((contentTraits) =>
        contentTraits.map((t) => {
          if (t.contentId === contentId && t.nodeId === nodeId) {
            return { ...t, scale }
          }
          return t
        })
      )
    },

    add(
      contentTrait: Pick<ContentTrait, 'nodeId' | 'contentId'> & {
        body?: ContentTrait['body']
        scale?: ContentTrait['scale']
      }
    ) {
      contentTraitsStore.update((contentTraits) => [
        ...contentTraits,
        { body: '', scale: 0, ...contentTrait },
      ])
    },
  }

  return setContext('contents', {
    contents: contentsStore,
    contentTraits: contentTraitsStore,
  })
}

export function getContentsContext(): ReturnType<typeof setContentsContext> {
  return getContext('contents')
}
