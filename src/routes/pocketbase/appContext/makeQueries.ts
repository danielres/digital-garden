import type PocketBase from 'pocketbase'
import { groupBy } from 'ramda'
import {
  isUserSelect,
  type TopicSelect,
  type TraitExpandedWithTopic,
  type TraitGeneric,
  type TraitItemSelect,
  type TraitSelect,
  type UserNormalized,
  type UserSelect,
} from '../types.d'
import { normalizeUser } from '../utils/users'

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

      list: () => pb.collection<TopicSelect>('topics').getFullList({ sort: '-label' }),

      traits: async (topicId: TopicSelect['id']) => {
        const beforeJoin = await pb.collection<TraitSelect>('traits').getFullList({
          filter: pb.filter('topic={:topicId}', { topicId }),
        })

        const joined = beforeJoin.map(async (trait) => {
          const { itemId, itemType, ...rest } = trait

          const target = (await pb.collection(itemType).getOne(`id="${itemId}"`, {
            fields: 'id,collectionName,avatar,username,slug,label',
          })) as TraitItemSelect

          return {
            ...rest,
            target: isUserSelect(target) ? normalizeUser(target) : target,
          } as TraitGeneric
        })

        const resolved = (await Promise.all(joined)) satisfies TraitGeneric[]

        return groupBy((t: TraitGeneric) => t.target.collectionName)(resolved)
      },
    },

    users: {
      bySlug: async (slug: UserSelect['slug']): Promise<UserNormalized> => {
        const res = await pb.collection<UserSelect>('users').getFirstListItem(`slug="${slug}"`, {})
        return normalizeUser(res)
      },

      list: async (): Promise<UserNormalized[]> => {
        const res = await pb.collection<UserSelect>('users').getFullList({ sort: '-created' })
        return res.map(normalizeUser)
      },
    },
  }
}
