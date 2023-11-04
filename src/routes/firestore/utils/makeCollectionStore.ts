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

export const makeCollectionStore = <T>(
  db: Firestore,
  resourceType: string,
  path: string,
  getLabel: (data: T) => string
) => {
  const store = writable([], (set: Subscriber<T[]>) =>
    onSnapshot(query(collection(db, path) as CollectionReference), (snapshot) => {
      set(
        snapshot.empty
          ? []
          : snapshot.docs.map((doc) => ({
              ...(doc.data() as T),
              id: doc.id,
              label: getLabel(doc.data() as T),
            }))
      )
    })
  )

  return {
    ...readonly(store),
    async add(item: Partial<T>) {
      return await addDoc(collection(db, path), {
        ...item,
        resourceType,
        createdAt: serverTimestamp(),
      })
    },
    del(id: string) {
      deleteDoc(doc(db, path, id))
    },
    update(id: string, item: Partial<T>) {
      updateDoc(doc(db, path, id), { ...item, updatedAt: serverTimestamp() })
    },
  }
}
