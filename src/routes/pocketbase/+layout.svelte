<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton'
  import FormSignIn from './FormSignIn.svelte'
  import { getAppContext, setAppContext } from './appContext'

  setAppContext()
  const app = getAppContext()
</script>

<div class="p-8 space-y-8">
  <div class="flex gap-4">
    {#if $app.user}
      <Avatar width="w-10" initials={$app.user.email} />
      <button class="btn variant-soft" on:click={() => app.auth.signout()}>Sign out</button>
    {:else}
      <FormSignIn />
    {/if}
  </div>

  <slot />
</div>
