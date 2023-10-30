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

const googleAuthprovider = new GoogleAuthProvider()

type AppContext = ReturnType<typeof makeAppContext>

type DbRecord = {
  id: string
  createdAt: Timestamp
  updatedAt?: Timestamp
}

export type Topic = DbRecord & {
  text: string
  name: string
}

export type Edge = DbRecord & {
  parentId: Topic['id']
  childId: Topic['id']
}

export type Person = DbRecord & {
  name: string
  slug: string
  body: string
  picture: string
}

export type Trait = DbRecord & {
  scale: number
  targetKind: 'person'
  targetId: Person['id']
  topicId: Topic['id']
  kind: 'interest' | 'expertise'
}

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

function makeAppContext() {
  const loading = writable(true)
  if (browser) getRedirectResult(auth).then(() => loading.set(false))
  const persons = makeCollectionStore<Person>(db, 'persons')
  const _edges = makeCollectionStore<Edge>(db, 'edges2')
  const edges = {
    ..._edges,
    add({ parentId, childId }: { parentId: Topic['id']; childId: Topic['id'] }): Result {
      const existingEdge = get(_edges).find((e) => e.parentId === parentId && e.childId === childId)
      if (existingEdge) return { success: false, code: 'EDGE_ALEARY_EXISTS' }
      _edges.add({ parentId, childId })
      return { success: true }
    },
  }
  const _topics = makeCollectionStore<Topic>(db, 'topics')
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
    add({ name, parentId }: { name: string; parentId: Topic['id'] }) {
      const extistingTopic = get(_topics).find((t) => t.name === name)
      if (extistingTopic) return { success: false, code: 'TOPIC_ALREADY_EXISTS' }
      _topics.add({ name }).then((ref) => edges.add({ parentId, childId: ref.id }))
      return { success: true }
    },
    getChildren(id: Topic['id']) {
      return get(edges).filter((e) => e.parentId === id)
    },
  }
  const traits = makeCollectionStore<Trait>(db, 'traits2')
  const user = readonly(writable(auth?.currentUser ?? null, (set) => onAuthStateChanged(auth, set)))
  const signin = () => signInWithPopup(auth, googleAuthprovider)
  return { user, persons, topics, edges, traits, auth: { ...auth, loading, signin } }
}
