<script lang="ts">
  import { useMachine } from '@xstate/svelte'
  import { counterMachine } from './machine'

  const { state, send, service } = useMachine(counterMachine)
</script>

<div class="max-w-md mx-auto py-16 grid justify-items-center gap-8">
  <button
    class="btn variant-ghost p-2 text-center"
    on:click={() => send($service.value === 'active' ? 'DEACTIVATE' : 'ACTIVATE')}
  >
    {$service.value}
  </button>

  <div class="w-16 text-center">{$state.context.count}</div>

  <div class="flex gap-4">
    <button class="btn variant-ghost" on:click={() => send('DEC')}>DEC</button>
    <button class="btn variant-ghost" on:click={() => send('INC')}>INC</button>
  </div>
</div>
