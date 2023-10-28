import {
  CollectionReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  type Firestore,
} from 'firebase/firestore'
import { readonly, writable, type Subscriber } from 'svelte/store'

export const makeCollectionStore = <T>(db: Firestore, path: string) => {
  const store = writable([], (set: Subscriber<T[]>) =>
    onSnapshot(query(collection(db, path) as CollectionReference), (q) => {
      set(q.empty ? [] : q.docs.map((doc) => ({ ...(doc.data() as T), id: doc.id })))
    })
  )

  return {
    ...readonly(store),
    async add(item: Partial<T>) {
      return await addDoc(collection(db, path), { ...item, createdAt: serverTimestamp() })
    },
    del(id: string) {
      deleteDoc(doc(db, path, id))
    },
    update(id: string, item: Partial<T>) {
      updateDoc(doc(db, path, id), { ...item, updatedAt: serverTimestamp() })
    },
  }
}
