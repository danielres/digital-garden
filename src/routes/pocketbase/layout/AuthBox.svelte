<script lang="ts">
  import FormSignIn from './FormSignIn.svelte'
  import FormSignup from './FormSignup.svelte'

  const tabs = ['Sign in', 'Sign up']
  let tabIdx = 0
</script>

<div class="grid gap-4 justify-items-center">
  <ul class="flex gap-4">
    {#each tabs as tab, i}
      <li>
        <button
          class="px-2 py-2 hover:opacity-100 transition-opacity border-surface-400-500-token"
          class:opacity-75={tabIdx !== i}
          class:border-b-2={tabIdx === i}
          class:opacity-100={tabIdx === i}
          type="button"
          on:click={() => (tabIdx = i)}
        >
          {tab}
        </button>
      </li>
    {/each}
  </ul>

  <div class="card variant-glass-surface p-8 w-fit max-w-md">
    {#if tabs[tabIdx] === 'Sign in'}
      <FormSignIn />
    {/if}
    {#if tabs[tabIdx] === 'Sign up'}
      <FormSignup />
    {/if}
  </div>
</div>
