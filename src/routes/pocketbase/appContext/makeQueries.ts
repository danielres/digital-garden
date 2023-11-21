import type PocketBase from 'pocketbase'
import type { TopicSelect, Trait, UserSelect } from '../types'

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
              collectionName: 'topics' satisfies TopicSelect['collectionName'],
            }))
          ),
    },

    topics: {
      bySlug: (slug: TopicSelect['slug']): Promise<TopicSelect> =>
        pb.collection('topics').getFirstListItem(`slug="${slug}"`, {}),

      traits: ({ id }: { id: TopicSelect['id'] }) => {
        const userTraitsPromise = pb
          .collection('usersTraits')
          .getFullList({ filter: pb.filter('topic={:id}', { id }), expand: 'item' })
          .then((traits) => ({
            users: traits.map(({ desc, level, kind, expand }) => ({
              desc,
              level,
              kind,
              label: expand?.item.username,
              slug: expand?.item.slug,
              collectionName: 'users' satisfies UserSelect['collectionName'],
            })),
          }))

        return userTraitsPromise
      },
    },

    user: {
      bySlug: (slug: UserSelect['slug']): Promise<UserSelect> =>
        pb.collection('users').getFirstListItem(`slug="${slug}"`, {}),
    },
  }
}
