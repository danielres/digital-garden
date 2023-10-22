<script>
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import * as Icons from './Icons'

  const dispatch = createEventDispatcher()
</script>

<div
  class="grid fixed inset-8 md:inset-x-auto md:right-8 md:w-full md:max-w-md variant-ghost backdrop-blur"
  transition:fade={{ duration: 100 }}
>
  <button
    class="justify-self-end self-start p-2 pb-0 text-3xl opacity-30 hover:opacity-80"
    on:click={() => dispatch('close')}
  >
    <Icons.Xmark />
  </button>

  <div class="p-6 pt-0 overflow-y-auto">
    <div>
      <slot />
    </div>
  </div>
</div>

<style lang="postcss">
  .grid {
    grid-template-rows: auto 1fr;
  }
</style>
