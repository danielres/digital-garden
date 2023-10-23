import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getContext, setContext } from 'svelte'

const firebaseConfig = {
  apiKey: 'AIzaSyDnfFEp4jJiSwYzE4C8WoTL07IwTH3zPag',
  authDomain: 'nodetree-8950f.firebaseapp.com',
  projectId: 'nodetree-8950f',
  storageBucket: 'nodetree-8950f.appspot.com',
  messagingSenderId: '705413254878',
  appId: '1:705413254878:web:6db2a9a98f846f1417bc4f',
}

export function setFirebaseContext() {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const auth = getAuth(app)

  return setContext('firebase', {
    auth,
    db,
  })
}

export function getFirebaseContext(): ReturnType<typeof setFirebaseContext> {
  return getContext('firebase')
}
