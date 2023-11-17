<script lang="ts">
  import { fade } from 'svelte/transition'
  import { onMount } from 'svelte'
  import { twMerge } from 'tailwind-merge'

  const strokeWidth = 1
  const size = 24

  let visible1 = false
  let visible2 = false
  onMount(() => setTimeout(() => (visible1 = true), 0))
  onMount(() => setTimeout(() => (visible2 = true), 1000))
</script>

<svg
  class={'w-12 animate-spin opacity-75 mx-auto animation-duration-2000'}
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-width={strokeWidth}
>
  {#if visible2}
    <circle
      stroke-dasharray="100% 200%"
      cx={size / 2}
      cy={size / 2}
      r={size / 2 - strokeWidth}
      in:fade={{ duration: 1000 }}
      class="animate-pulse"
    />
  {/if}

  {#if visible1}
    <circle
      style:opacity={0.25}
      cx={size / 2}
      cy={size / 2}
      r={size / 2 - strokeWidth}
      in:fade={{ duration: 250 }}
    />
  {/if}
</svg>
