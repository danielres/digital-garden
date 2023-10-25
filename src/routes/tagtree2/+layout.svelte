<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { GoogleAuthProvider, getRedirectResult, signInWithPopup } from 'firebase/auth'
  import { FirebaseApp, SignedIn, SignedOut } from 'sveltefire'
  import Contents from './Contents.svelte'
  import Tree from './NodeTree.svelte'
  import MenuModes from './NodeTree/MenuModes.svelte'
  import Panel from './Panel.svelte'
  import Persons from './Persons.svelte'
  import * as data from './data'
  import { auth, firestore, storage } from './firebase'
  import { setContentsContext } from './useContents'
  import { setPersonsContext } from './usePersons'
  import { getTreeContext, setTreeContext } from './useTree'

  setPersonsContext(data.persons, data.traits)
  setTreeContext(data.nodes, data.edges)
  setContentsContext(data.contents, data.contentTraits)

  const { nodes } = getTreeContext()

  const googleAuthprovider = new GoogleAuthProvider()
</script>

{#await getRedirectResult(auth)}
  <div class="fixed inset-0 flex place-items-center justify-center">
    <div class="variant-ghost-surface p-8 max-w-md">Loading...</div>
  </div>
{:then value}
  <FirebaseApp {auth} {firestore} {storage}>
    <SignedIn let:user let:signOut>
      <nav class="flex justify-end gap-4 px-4 py-2">
        {#if user.photoURL}
          <img src={user.photoURL} alt="" class="w-12 h-12 rounded-full" />
        {/if}
        <button class="btn variant-soft-primary" on:click={signOut}>Sign Out</button>
      </nav>

      <div class="grid grid-cols-2 max-w-7xl mx-auto gap-8">
        <div class="">
          <Persons />
        </div>

        <div class="space-y-8">
          <div>
            <h2>Topics</h2>
            <div class="space-y-4 variant-soft p-4">
              <MenuModes />
              <Tree
                on:nodeClicked={({ detail: nodeId }) => goto(`/tagtree2/topics/${nodeId}`)}
                on:newNode={({ detail: { value, parentId } }) => nodes.add({ value, parentId })}
                on:copy={({ detail: { id, newParentId } }) => nodes.copy({ id, newParentId })}
                on:move={({ detail: { id, newParentId } }) => nodes.move({ id, newParentId })}
              />
            </div>
          </div>

          <div>
            <h2>Contents</h2>
            <div class="space-y-4 variant-soft p-4">
              <Contents />
            </div>
          </div>
        </div>
      </div>

      {#if $page.url.pathname !== '/tagtree2'}
        <Panel on:close={() => goto('/tagtree2')}>
          <slot />
        </Panel>
      {/if}
    </SignedIn>

    <SignedOut let:auth>
      <div class="mt-16">
        <div class="flex justify-center">
          <button
            class="btn variant-soft-primary"
            on:click={() => signInWithPopup(auth, googleAuthprovider)}
          >
            Sign In with Google
          </button>
        </div>
      </div>
    </SignedOut>
  </FirebaseApp>
{/await}
