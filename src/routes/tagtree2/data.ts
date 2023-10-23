export type Node = { value: string; id: string; body: string }
export type Edge = { parentId: string; childId: string }
export type Person = { id: string; name: string; body: string; picture: string }
export type Trait = {
  kind: string
  personId: string
  nodeId: string
  body: string
  scale: number
}
export type Content = {
  id: string
  addedBy: Person['id']
  addedAt: Date
  type:
    | 'internal.article'
    | 'external.article'
    | 'external.tutorial'
    | 'external.video.youtube'
    | 'external.audio.vimeo'
  src: string
  title: string
  body: string
  description: string
}

export type ContentTrait = {
  contentId: Content['id']
  nodeId: Node['id']
  body: string
  scale: number
}

export const persons: Person[] = [
  {
    id: 'daniel',
    name: 'Daniel',
    body: 'I am a person and I love cats.',
    picture: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 'jill',
    name: 'Jill',
    body: 'I am a person and I love dogs.',
    picture: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'paul',
    name: 'Paul',
    body: 'I am a person and I love hamsters.',
    picture: 'https://i.pravatar.cc/150?img=8',
  },
]

export const traits: Trait[] = [
  { kind: 'hobby', personId: 'jill', nodeId: 'svelte', body: 'hobby svelte', scale: 4 },
  {
    kind: 'interest',
    personId: 'daniel',
    nodeId: 'typescript',
    body: 'typescript is great',
    scale: 5,
  },
  { kind: 'interest', personId: 'daniel', nodeId: 'svelte', body: 'svelte is meh', scale: 3.5 },
  { kind: 'expertise', personId: 'daniel', nodeId: 'svelte', body: 'pro svelte', scale: 5 },
  { kind: 'interest', personId: 'jill', nodeId: 'typescript', body: 'typescript is ok', scale: 4 },
  { kind: 'expertise', personId: 'jill', nodeId: 'svelte', body: 'newbie svelte', scale: 1 },
]

export const nodes: Node[] = [
  { value: 'root', id: 'root', body: '' },
  {
    value: 'Typescript',
    id: 'typescript',
    body: 'TypeScript is a superset of JavaScript that adds optional static typing.',
  },
  {
    value: 'Svelte',
    id: 'svelte',
    body: `<p><b>Svelte:</b> A framework for building web user interfaces using components.</p> <p><b>SvelteKit:</b> A framework built on Svelte for creating web applications with routing, server-side rendering, and other features.</p>`,
  },
  {
    value: 'Sveltekit',
    id: 'sveltekit',
    body: `<p><b>Svelte:</b> A framework for building web user interfaces using components.</p> <p><b>SvelteKit:</b> A framework built on Svelte for creating web applications with routing, server-side rendering, and other features.</p>`,
  },
]

export const edges: Edge[] = [
  { parentId: 'root', childId: 'typescript' },
  { parentId: 'root', childId: 'svelte' },
  { parentId: 'svelte', childId: 'sveltekit' },
]

export const contents: Content[] = [
  {
    id: '1',
    addedBy: 'daniel',
    addedAt: new Date(),
    type: 'external.tutorial',
    src: 'https://svelte.dev/tutorial',
    title: 'Svelte Tutorial',
    body: '',
    description: 'The official Svelte tutorial.',
  },
]

export const contentTraits: ContentTrait[] = [
  { contentId: '1', nodeId: 'svelte', body: '', scale: 5 },
]
