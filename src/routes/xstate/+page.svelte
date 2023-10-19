<script lang="ts">
  import { interpret } from 'xstate'
  import { toggleMachine } from './machine'

  const toggleService = interpret(toggleMachine).start()
</script>

<div class="max-w-lg mx-auto my-16 justify-items-center grid gap-4">
  <div>
    State value: {$toggleService.value}
  </div>

  <div class="flex gap-4">
    {#each $toggleService.nextEvents as nextEvent}
      <button class="btn variant-ghost" on:click={() => toggleService.send(nextEvent)}>
        {nextEvent}
      </button>
    {/each}
  </div>
</div>
