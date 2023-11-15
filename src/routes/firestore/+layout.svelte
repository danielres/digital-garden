<script lang="ts">
  import { page } from '$app/stores'
  import { Toast, initializeStores } from '@skeletonlabs/skeleton'
  import { getAppContext, setAppContext } from './appContext'
  import * as Icons from './components/Icons'
  import { paths } from './utils/navigation'

  initializeStores()
  setAppContext()

  const { user, auth, ui } = getAppContext()
  const { loading } = auth

  const tabs = [
    { name: 'Topics', url: paths.topics(), icon: Icons.BookmarkMini },
    { name: 'Persons', url: paths.persons(), icon: Icons.UserMini },
    { name: 'Contents', url: paths.contents(), icon: Icons.DocumentTextMini },
    { name: 'Traits', url: paths.traits(), icon: Icons.PaperClipMini },
    { name: 'Components', url: paths.components(), icon: Icons.Cog6Tooth },
  ]
</script>

<Toast />

{#if $loading}
  <div class="fixed inset-0 flex place-items-center justify-center">
    <div class="variant-ghost-surface p-8 max-w-md">Loading...</div>
  </div>
{:else}
  <div class="max-w-4xl mx-auto pt-8 space-y-4">
    {#if $user}
      <div class="flex justify-end gap-4">
        <button
          type="button"
          class="button btn text-error-400"
          class:variant-ghost-error={!$ui.editing.value}
          class:variant-filled-error={$ui.editing.value}
          on:click={() => ui.edit.toggle()}
        >
          {$ui.editing.value ? 'Done' : 'Admin'}
        </button>

        <button type="button" class="button btn variant-ghost" on:click={() => auth.signOut()}>
          Logout
        </button>
        <img class="h-12 aspect-square rounded-full" src={$user.photoURL} alt="User portrait" />
      </div>
    {:else}
      <div class="flex justify-center">
        <button class="btn variant-soft-primary" on:click={() => auth.signin()}>
          Sign In with Google
        </button>
      </div>
    {/if}

    <div class="flex gap-2">
      {#each tabs as tab}
        <a
          class="btn btn-sm rounded px-4 py-2 flex gap-1 items-center"
          class:variant-ghost-primary={$page.url.pathname.startsWith(tab.url)}
          class:variant-ghost={!$page.url.pathname.startsWith(tab.url)}
          href={tab.url}
        >
          <svelte:component this={tab.icon} />
          {tab.name}
        </a>
      {/each}
    </div>

    <div>
      <slot />
    </div>
  </div>
{/if}
