import type PocketBase from 'pocketbase'
import type { TopicSelect, TraitGeneric, TraitSelect, UserNormalized, UserSelect } from '../types.d'
import { normalizeUser } from '../utils/users'
import { inflect } from '../../firestore/utils/string'

export function makeQueries(pb: PocketBase) {
  return {
    traitsSource: async (source: UserNormalized): Promise<{ traits: TraitGeneric[] }> => {
      const sourceType = inflect.singularize(source.collectionName)

      const expanded = await pb.collection<TraitSelect>('traits').getFullList({
        filter: pb.filter(`${sourceType}={:sourceId}`, { sourceId: source.id }),
        expand: 'topic',
      })

      return {
        traits: expanded.map(({ expand, ...rest }) => ({
          ...rest,
          target: expand!.topic,
        })) as TraitGeneric[],
      }
    },

    topics: {
      bySlug: (slug: TopicSelect['slug']): Promise<TopicSelect> =>
        pb.collection('topics').getFirstListItem(`slug="${slug}"`, {}),

      list: () => pb.collection<TopicSelect>('topics').getFullList({ sort: '-label' }),

      traits: async (topicId: TopicSelect['id']) => {
        const traitsExpanded = await pb.collection<TraitSelect>('traits').getFullList({
          filter: pb.filter('topic={:topicId}', { topicId }),
          expand: 'user',
        })

        return traitsExpanded.map((trait) => {
          const { expand, ...rest } = trait
          if (expand!.user) return { ...rest, target: normalizeUser(expand!.user) }
          else return { ...rest, target: Object.values(expand!)[0] }
        }) as TraitGeneric[]
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
