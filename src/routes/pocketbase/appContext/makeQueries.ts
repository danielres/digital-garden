import type PocketBase from 'pocketbase'
import type { Trait, UserSelect } from '../types'

export type TraitWithTopic = {
  desc: string
  level: number
  kind: string
  expand: {
    topic: {
      label: string
      slug: string
    }
  }
}

export function makeQueries(pb: PocketBase) {
  return {
    item: {
      traits: ({ id, collectionName }: { id: string; collectionName: 'users' }): Promise<Trait[]> =>
        pb
          .collection(collectionName + 'Traits')
          .getFullList<TraitWithTopic>({ filter: pb.filter('item={:id}', { id }), expand: 'topic' })
          .then((traits) =>
            traits.map(({ desc, level, kind, expand }) => ({
              desc,
              level,
              kind,
              label: expand.topic.label,
              slug: expand.topic.slug,
            }))
          ),
    },

    user: {
      bySlug: (slug: UserSelect['slug']): Promise<UserSelect> =>
        pb.collection('users').getFirstListItem(`slug="${slug}"`, {}),
    },
  }
}
