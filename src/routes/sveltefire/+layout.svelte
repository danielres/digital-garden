<script lang="ts">
  import { PUBLIC_FIREBASE_CONFIG } from '$env/static/public'
  import { initializeApp } from 'firebase/app'
  import { getAuth } from 'firebase/auth'
  import { getFirestore } from 'firebase/firestore'
  import { getStorage } from 'firebase/storage'
  import { FirebaseApp } from 'sveltefire'

  const firebaseConfig = PUBLIC_FIREBASE_CONFIG
  const app = initializeApp(JSON.parse(firebaseConfig))

  const firestore = getFirestore(app)
  const auth = getAuth(app)
  const storage = getStorage(app)
</script>

<FirebaseApp {auth} {firestore} {storage}>
  <slot />
</FirebaseApp>
