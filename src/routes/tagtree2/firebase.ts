import { PUBLIC_FIREBASE_CONFIG } from '$env/static/public'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = PUBLIC_FIREBASE_CONFIG
const app = initializeApp(JSON.parse(firebaseConfig))

export const firestore = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
