import type { Person, Topic, Trait, Content } from '../appContext'

const BASE_PATH = '/firestore'

export const paths = {
  persons: (personSlug?: Person['slug']) =>
    [BASE_PATH, 'persons', personSlug].filter(Boolean).join('/'),

  contents: (contentSlug?: Content['slug']) =>
    [BASE_PATH, 'contents', contentSlug].filter(Boolean).join('/'),

  topics: (topicSlug?: Topic['slug']) => [BASE_PATH, 'topics', topicSlug].filter(Boolean).join('/'),

  traits: (traitId?: Trait['id']) => [BASE_PATH, 'traits', traitId].filter(Boolean).join('/'),

  resource: (resource: Trait | Topic | Person | Content) => {
    if (resource.resourceType === 'trait') return paths.traits(resource.id)
    if (resource.resourceType === 'topic') return paths.topics(resource.slug)
    if (resource.resourceType === 'person') return paths.persons(resource.slug)
    if (resource.resourceType === 'content') return paths.contents(resource.slug)
  },
}
