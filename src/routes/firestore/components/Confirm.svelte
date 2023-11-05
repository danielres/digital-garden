<script lang="ts">
  import { focusTrap } from '@skeletonlabs/skeleton'
  import { fade, fly } from 'svelte/transition'

  let showDialog = false
  let functionToCall = () => {}

  function openDialog() {
    showDialog = true
  }

  function closeDialog() {
    showDialog = false
  }

  function confirm(func: () => void) {
    functionToCall = func
    openDialog()
  }
</script>

<slot {confirm} />

{#if showDialog}
  <div class="overlay" in:fade={{ duration: 200 }} out:fade={{ delay: 200, duration: 200 }}>
    <div
      use:focusTrap={true}
      class="text-white p-8 variant-soft rounded backdrop-blur border border-error-500 space-y-8"
      in:fly={{ y: -10, delay: 200, duration: 200 }}
      out:fly={{ y: -10, duration: 200 }}
    >
      <div>
        <slot name="description" />
      </div>

      <div class="buttons">
        <button type="button" class="btn rounded variant-ghost" on:click={closeDialog}>
          Cancel
        </button>

        <button
          type="button"
          class="btn rounded variant-filled-error"
          on:click={() => {
            closeDialog()
            functionToCall()
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
{/if}

<style lang="postcss">
  .overlay {
    z-index: 1000;
    @apply inset-0 fixed;
    @apply bg-surface-900/80 backdrop-blur;
    @apply grid place-items-center;
  }

  .buttons {
    @apply flex gap-4 justify-center;
  }
</style>
