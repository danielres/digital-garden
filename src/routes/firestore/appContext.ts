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

type Todo = DbRecord & {
  text: string
  complete: boolean
}

export type Topic = DbRecord & {
  text: string
  name: string
}

export type Edge = DbRecord & {
  parentId: Topic['id']
  childId: Topic['id']
}

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
  const todos = makeCollectionStore<Todo>(db, 'todos')
  const edges = makeCollectionStore<Edge>(db, 'edges2')
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
      _topics.add({ name }).then((ref) => edges.add({ parentId, childId: ref.id }))
    },
    getChildren(id: Topic['id']) {
      return get(edges).filter((e) => e.parentId === id)
    },
  }
  const user = readonly(writable(auth?.currentUser ?? null, (set) => onAuthStateChanged(auth, set)))
  const signin = () => signInWithPopup(auth, googleAuthprovider)
  return { user, todos, topics, edges, auth: { ...auth, loading, signin } }
}
