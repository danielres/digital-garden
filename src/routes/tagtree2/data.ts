import type { Edge, Node } from './useTree'

export const persons = [
  { id: 'tom', name: 'Tom' },
  { id: 'jill', name: 'Jill' },
  { id: 'paul', name: 'Paul' },
]

export const traits = [
  { kind: 'hobby', personId: 'jill', nodeId: '02', body: 'hobby 02', scale: 4 },
  { kind: 'interest', personId: 'tom', nodeId: '01', body: '01 is great', scale: 5 },
  { kind: 'interest', personId: 'tom', nodeId: '02', body: '02 is meh', scale: 3.5 },
  { kind: 'expertise', personId: 'tom', nodeId: '02', body: 'pro 02', scale: 5 },
  { kind: 'interest', personId: 'jill', nodeId: '01', body: '01 is ok', scale: 4 },
  { kind: 'expertise', personId: 'jill', nodeId: '02', body: 'newbie 02', scale: 1 },
]

export const nodes: Node[] = [
  { value: 'root', id: 'root', body: '' },
  { value: 'node1', id: '01', body: 'Node1 body' },
  { value: 'node2 Lorem', id: '02', body: 'Node2 body' },
  { value: 'node3', id: '03', body: 'Node3 body' },
]

export const edges: Edge[] = [
  { parentId: 'root', childId: '01' },
  { parentId: 'root', childId: '02' },
  { parentId: '02', childId: '03' },
]
