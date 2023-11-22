<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import { stripHtml, truncate } from '../utils/string'
  import Muted from './Muted.svelte'

  export let text: string
  export let preview = false
</script>

<div
  class={twMerge(
    'rounded-xs variant-soft opacity-80',
    preview ? 'text-xs px-2 py-1' : 'text-sm space-y-2 p-4'
  )}
>
  {#if text}
    {#if preview}
      {truncate(stripHtml(text))}
    {:else}
      {@html text}
    {/if}
  {:else}
    <Muted>No description</Muted>
  {/if}
</div>
