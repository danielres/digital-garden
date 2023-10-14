<script>
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import * as Icons from './Icons'

  const dispatch = createEventDispatcher()
</script>

<div
  class="stack fixed inset-8 md:inset-x-auto md:right-8 md:w-full md:max-w-md variant-ghost backdrop-blur overflow-y-auto"
  transition:fade={{ duration: 100 }}
>
  <div class="p-6 space-y-8">
    <slot />
  </div>

  <button
    class="justify-self-end self-start p-2 text-3xl opacity-30 hover:opacity-80"
    on:click={() => dispatch('close')}
  >
    <Icons.Xmark />
  </button>
</div>
