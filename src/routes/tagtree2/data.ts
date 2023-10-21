export type Node = { value: string; id: string; body: string }
export type Edge = { parentId: string; childId: string }
export type Person = { id: string; name: string; body: string }
export type Trait = {
  kind: string
  personId: string
  nodeId: string
  body: string
  scale: number
}

export const persons: Person[] = [
  { id: 'daniel', name: 'Daniel', body: 'I am a person and I love cats.' },
  { id: 'jill', name: 'Jill', body: 'I am a person and I love dogs.' },
  { id: 'paul', name: 'Paul', body: 'I am a person and I love hamsters.' },
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
    body: `Svelte: A framework for building web user interfaces using components. <br />SvelteKit: A framework built on Svelte for creating web applications with routing, server-side rendering, and other features.`,
  },
  {
    value: 'Sveltekit',
    id: 'sveltekit',
    body: 'Svelte: A framework for building web user interfaces using components. <br />SvelteKit: A framework built on Svelte for creating web applications with routing, server-side rendering, and other features.',
  },
]

export const edges: Edge[] = [
  { parentId: 'root', childId: 'typescript' },
  { parentId: 'root', childId: 'svelte' },
  { parentId: 'svelte', childId: 'sveltekit' },
]
