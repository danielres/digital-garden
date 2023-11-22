import type PocketBase from 'pocketbase'
import { groupBy } from 'ramda'
import type {
  CollectionName,
  TopicSelect,
  TraitGeneric,
  TraitExpandedWithTopic,
  UserSelect,
} from '../types'

export function makeQueries(pb: PocketBase) {
  return {
    item: {
      traits: async (itemId: string): Promise<TraitGeneric[]> => {
        const expanded = await pb.collection('traits').getFullList<TraitExpandedWithTopic>({
          filter: pb.filter('itemId={:itemId}', { itemId }),
          expand: 'topic',
          fields:
            'id,desc,level,kind,expand.topic.slug,expand.topic.label,expand.topic.collectionName',
        })

        return expanded.map((expanded) => {
          const { expand, ...rest } = expanded
          return { ...rest, target: expand.topic }
        })
      },
    },

    topics: {
      bySlug: (slug: TopicSelect['slug']): Promise<TopicSelect> =>
        pb.collection('topics').getFirstListItem(`slug="${slug}"`, {}),

      traits: async (topicId: TopicSelect['id']) => {
        const beforeJoin = (await pb.collection('traits').getFullList({
          filter: pb.filter('topic={:topicId}', { topicId }),
          fields: 'id,desc,kind,level,itemId,itemType',
        })) as {
          desc: string
          itemId: string
          itemType: 'users'
          kind: string
          level: string
        }[]

        const joined = beforeJoin.map(async (trait) => {
          const { itemId, itemType, ...rest } = trait

          const target = (await pb.collection(itemType).getFirstListItem(`id="${itemId}"`, {
            fields: 'id,collectionName,avatar,username,slug,label',
          })) as {
            id: string
            avatar?: string
            username?: string
            collectionName: CollectionName
            slug: string
          }

          return {
            ...rest,
            target: {
              ...target,
              ...(target.username ? { label: target.username } : {}),
            },
          } as TraitGeneric
        })

        const resolved = (await Promise.all(joined)) satisfies TraitGeneric[]

        return groupBy((t: TraitGeneric) => t.target.collectionName)(resolved)
      },
    },

    user: {
      bySlug: (slug: UserSelect['slug']): Promise<UserSelect> =>
        pb.collection('users').getFirstListItem(`slug="${slug}"`, {}),
    },
  }
}
