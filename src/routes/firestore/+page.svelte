<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import Edges from './Edges.svelte'
  import Todos from './Todos.svelte'
  import Topics from './Topics.svelte'
  import Tree from './Tree.svelte'

  let tabIdx = 0
  const tabs = [Tree, Topics, Edges, Todos]

  const handleHash = (hash: string) => {
    const name = hash.replace('#', '')
    const idx = tabs.findIndex((t) => t.name.includes(name))
    if (idx !== -1) tabIdx = idx
  }

  $: handleHash($page.url.hash)
</script>

<svelte:window on:hashchange={(e) => handleHash(new URL(e.newURL).hash)} />

<div class="flex gap-2">
  {#each tabs as tab, i}
    {@const name = tab.name.replace('Proxy<', '').replace('>', '')}
    <button
      class="btn btn-sm {tabIdx === i ? 'variant-ghost-primary' : 'variant-soft'}"
      on:click={() => goto($page.url.pathname + '#' + name)}
    >
      {name}
    </button>
  {/each}
</div>

{#each tabs as tab, i}
  {#if tabIdx === i}
    <svelte:component this={tab} />
  {/if}
{/each}
