import { browser } from '$app/environment'
import { PUBLIC_FIREBASE_CONFIG } from '$env/static/public'
import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth'
import type { Timestamp } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { getContext, setContext } from 'svelte'
import { get, readonly, writable } from 'svelte/store'
import { makeCollectionStore } from './utils/makeCollectionStore'
import { nestedify } from './utils/forms'

const googleAuthprovider = new GoogleAuthProvider()

type AppContext = ReturnType<typeof makeAppContext>

type DbRecord = {
  id: string
  label: string
  createdAt: Timestamp
  updatedAt?: Timestamp
}

export type Topic = DbRecord & {
  resourceType: 'topic'
  text: string
  slug: string
}

export type Edge = DbRecord & {
  resourceType: 'edge'
  parentId: Topic['id']
  childId: Topic['id']
}

export type Person = DbRecord & {
  resourceType: 'person'
  slug: string
  text: string
  picture: string
}

export type Content = DbRecord & {
  resourceType: 'content'
  slug: string
  text: string
  url: string
}

export type PersonTrait = DbRecord & {
  resourceType: 'trait'
  targetKind: 'person'
  targetId: Person['id']
  topicId: Topic['id']
  text: string
  levels: {
    interest: number
    expertise: number
  }
}

export type ContentTrait = DbRecord & {
  resourceType: 'trait'
  targetKind: 'content'
  targetId: Content['id']
  topicId: Topic['id']
  text: string
  levels: {
    relevancy: number
  }
}

export type Trait = PersonTrait | ContentTrait

type ErrorCode = 'EDGE_ALEARY_EXISTS' | 'TOPIC_ALREADY_EXISTS'
export type Result = { success: true } | { success: false; code: ErrorCode }

const app = initializeApp(JSON.parse(PUBLIC_FIREBASE_CONFIG))
const db = getFirestore(app)
const auth = getAuth(app)

export function setAppContext() {
  const appContext = makeAppContext()
  setContext('appContext', appContext)
}

export function getAppContext() {
  return getContext('appContext') as AppContext
}

function makeAppContext(basePath = 'default/collections') {
  const loading = writable(true)
  if (browser) getRedirectResult(auth).then(() => loading.set(false))
  const persons = makeCollectionStore<Person>(
    db,
    'person',
    `${basePath}/persons`,
    (data) => data.label
  )
  const contents = makeCollectionStore<Content>(
    db,
    'content',
    `${basePath}/contents`,
    (data) => data.label
  )

  const _edges = makeCollectionStore<Edge>(db, 'edge', `${basePath}/edges`, (data) => data.id)
  const edges = {
    ..._edges,
    add({ parentId, childId }: { parentId: Topic['id']; childId: Topic['id'] }): Result {
      const existingEdge = get(_edges).find((e) => e.parentId === parentId && e.childId === childId)
      if (existingEdge) return { success: false, code: 'EDGE_ALEARY_EXISTS' }
      _edges.add({ parentId, childId })
      return { success: true }
    },
  }
  const _topics = makeCollectionStore<Topic>(
    db,
    'topic',
    `${basePath}/topics`,
    (data) => data.label
  )
  const topics = {
    ..._topics,
    del(id: Topic['id']) {
      const edgesAsParent = get(edges).filter((e) => e.parentId === id)
      if (edgesAsParent.length) return console.log("Can't delete topic with children")
      const topicEdges = get(edges).filter((e) => e.parentId === id || e.childId === id)
      topicEdges.forEach((edge) => edges.del(edge.id))
      _topics.del(id)
    },
    move({ id, newParentId }: { id: Topic['id']; newParentId: Topic['id'] }) {
      const edge = get(edges).find((e) => e.childId === id && e.parentId !== newParentId)
      if (!edge) return
      const existingEdge = get(edges).find((e) => e.childId === id && e.parentId === newParentId)
      if (existingEdge) edges.del(edge.id)
      else edges.update(edge.id, { parentId: newParentId })
    },
    add({ label, parentId }: { label: string; parentId: Topic['id'] }) {
      const extistingTopic = get(_topics).find((t) => t.label === label)
      if (extistingTopic) return { success: false, code: 'TOPIC_ALREADY_EXISTS' }
      _topics.add({ label }).then((ref) => edges.add({ parentId, childId: ref.id }))
      return { success: true }
    },
    getChildren(id: Topic['id']) {
      return get(edges).filter((e) => e.parentId === id)
    },
  }
  const _traits = makeCollectionStore<Trait>(db, 'trait', `${basePath}/traits`, (data) => data.id)
  const traits = {
    ..._traits,
    findTarget(trait: Trait | undefined) {
      if (!trait) return undefined
      if (trait.targetKind === 'person') return get(persons).find((p) => p.id === trait.targetId)
      if (trait.targetKind === 'content') return get(contents).find((c) => c.id === trait.targetId)
      return undefined
    },
  }
  const user = readonly(writable(auth?.currentUser ?? null, (set) => onAuthStateChanged(auth, set)))
  const resources = {
    update(resource: (Topic | Person | Content | Trait) & Record<string, string>) {
      const { traits: traitsvalues, ...values } = nestedify(resource)

      if (resource.resourceType === 'topic') topics.update(resource.id, values)
      if (resource.resourceType === 'person') persons.update(resource.id, values)
      if (resource.resourceType === 'content') contents.update(resource.id, values)
      if (resource.resourceType === 'trait') traits.update(resource.id, values)

      if (!traitsvalues) return
      Object.entries(traitsvalues).forEach(([id, values]) => traits.update(id, values))
    },
  }
  const signin = () => signInWithPopup(auth, googleAuthprovider)
  return {
    user,
    persons,
    topics,
    edges,
    traits,
    contents,
    resources,
    auth: { ...auth, loading, signin },
  }
}
