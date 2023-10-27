import { browser } from '$app/environment'
import { PUBLIC_FIREBASE_CONFIG } from '$env/static/public'
import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  type Auth,
  type User,
  type UserCredential,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getContext, setContext } from 'svelte'
import { readonly, writable, type Readable, get } from 'svelte/store'
import { makeCollectionStore } from './utils/makeCollectionStore'
import type { Timestamp } from 'firebase/firestore'

const googleAuthprovider = new GoogleAuthProvider()

type AppContext = {
  auth: Auth & { loading: Readable<boolean> } & { signin: () => Promise<UserCredential> }
  user: Readable<User | null>
  todos: ReturnType<typeof makeCollectionStore<Todo>>
  edges: ReturnType<typeof makeCollectionStore<Edge>>
  topics: ReturnType<typeof makeCollectionStore<Topic>>
}

type DbRecord = {
  id: string
  createdAt: Timestamp
  updatedAt?: Timestamp
}

type Todo = DbRecord & {
  text: string
  complete: boolean
}

type Topic = DbRecord & {
  text: string
  name: string
}

type Edge = DbRecord & {
  parentId: Topic['id']
  childId: Topic['id']
}

const firebaseConfig = PUBLIC_FIREBASE_CONFIG
const app = initializeApp(JSON.parse(firebaseConfig))
const db = getFirestore(app)
const auth = getAuth(app)

export function setAppContext() {
  const loading = writable(true)
  if (browser) getRedirectResult(auth).then(() => loading.set(false))
  const todos = makeCollectionStore<Todo>(db, 'todos')
  const edges = makeCollectionStore<Edge>(db, 'edges2')
  const _topics = makeCollectionStore<Topic>(db, 'topics')
  const topics = {
    ..._topics,
    del(id: string) {
      const e = get(edges).filter((e) => e.parentId === id || e.childId === id)
      e.forEach((edge) => edges.del(edge.id))
      _topics.del(id)
    },
  }
  const user = readonly(writable(auth?.currentUser ?? null, (set) => onAuthStateChanged(auth, set)))
  const signin = () => signInWithPopup(auth, googleAuthprovider)
  const context: AppContext = { user, todos, topics, edges, auth: { ...auth, loading, signin } }
  setContext('appContext', context)
}

export function getAppContext() {
  return getContext('appContext') as AppContext
}
