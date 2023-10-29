<script lang="ts">
  import { Toast, initializeStores } from '@skeletonlabs/skeleton'
  import { getAppContext, setAppContext } from './appContext'

  initializeStores()
  setAppContext()

  const { user, auth } = getAppContext()
  const { loading } = auth
</script>

<Toast />

{#if $loading}
  <div class="fixed inset-0 flex place-items-center justify-center">
    <div class="variant-ghost-surface p-8 max-w-md">Loading...</div>
  </div>
{:else}
  <div class="max-w-xl mx-auto pt-8 space-y-4">
    {#if $user}
      <div class="flex justify-end gap-4">
        <button type="button" class="button btn variant-ghost" on:click={() => auth.signOut()}>
          Logout
        </button>
        <img class="h-12 aspect-square rounded-full" src={$user.photoURL} alt="User portrait" />
      </div>

      <slot />
    {:else}
      <div class="flex justify-center">
        <button class="btn variant-soft-primary" on:click={() => auth.signin()}>
          Sign In with Google
        </button>
      </div>
    {/if}
  </div>
{/if}
