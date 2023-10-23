<script lang="ts">
  import { GoogleAuthProvider, signInAnonymously, signInWithPopup } from 'firebase/auth'
  import { addDoc, collection, deleteDoc } from 'firebase/firestore'
  import { Collection, SignedIn, SignedOut, getFirebaseContext } from 'sveltefire'
  import { renderDate } from './utils/date'

  const { firestore } = getFirebaseContext()

  async function addPost(title: string) {
    if (!firestore) return
    const posts = collection(firestore, `users/test/posts`)
    await addDoc(posts, {
      title,
      content: 'Content of post ' + title,
      created: Date.now(),
    })
  }

  const provider = new GoogleAuthProvider()

  let title = ''
</script>

<div class="max-w-xl mx-auto space-y-4 py-8">
  <div class="flex justify-end gap-2">
    <SignedIn let:user let:signOut>
      {#if user.photoURL}
        <img src={user.photoURL} alt="" class="w-12 h-12 rounded-full" />
      {/if}
      <button class="btn variant-soft-primary" on:click={signOut}>Sign Out</button>
    </SignedIn>

    <SignedOut let:auth>
      <button class="btn variant-soft-primary" on:click={() => signInAnonymously(auth)}>
        Sign In anonymously
      </button>
      <button class="btn variant-soft-primary" on:click={() => signInWithPopup(auth, provider)}>
        Sign In with Google popup
      </button>
    </SignedOut>
  </div>

  <section class="space-y-4">
    <h2>Collection</h2>
    <form on:submit|preventDefault={() => addPost(title)} class="flex gap-2 items-center">
      <label class="contents">
        <input placeholder="title" class="input" type="text" bind:value={title} />
      </label>
      <button type="submit" class="btn variant-ghost">Submit</button>
    </form>

    <Collection ref="users/test/posts" let:data={posts}>
      {#each posts as post}
        <div class="stack variant-ghost p-4">
          <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p class="text-sm opacity-50">{renderDate(new Date(post.created))}</p>
          </div>
          <button class="place-self-start justify-self-end" on:click={() => deleteDoc(post.ref)}>
            delete
          </button>
        </div>
      {/each}
    </Collection>
  </section>

  <SignedIn let:user let:signOut>
    <h2>Profile</h2>
    <section class="variant-ghost-tertiary overflow-auto p-4 text-sm">
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </section>
  </SignedIn>
</div>
