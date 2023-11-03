<script lang="ts">
  import { browser } from '$app/environment'
  import MarkdownIt from 'markdown-it'
  import { checkOverflow } from '../utils/dom'
  import { stripHtml, truncate } from '../utils/string'
  import * as Icons from './Icons'

  export let text = ''
  export let plainText = false

  let expanded = false
  $: text && (expanded = false) // collapse automatically when text changes

  let collapsibleEl: HTMLElement
  let isOverflowing = false
  $: if (browser && collapsibleEl) isOverflowing = checkOverflow(collapsibleEl)

  const md = new MarkdownIt()
</script>

{#if text}
  {#if plainText}
    {truncate(stripHtml(md.render(String(text ?? ''))), 100)}
  {:else}
    {#key text}
      <div>
        <div
          class="markdown overflow-y-auto variant-glass px-4 py-2"
          class:max-h-[9rem]={!expanded}
          class:max-h-[36rem]={expanded}
          bind:this={collapsibleEl}
        >
          {@html md.render(String(text ?? ''))}
        </div>

        {#if isOverflowing}
          <button
            on:click={() => (expanded = !expanded)}
            class="w-full flex justify-center variant-glass"
            type="button"
          >
            <div class="px-2">
              <svelte:component
                this={expanded ? Icons.ChevronUp : Icons.ChevronDown}
                class="w-5 opacity-50 hover:opacity-100"
              />
            </div>
          </button>
        {/if}
      </div>
    {/key}
  {/if}
{/if}
