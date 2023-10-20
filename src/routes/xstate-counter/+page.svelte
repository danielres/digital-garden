<script lang="ts">
  import { useMachine, useSelector } from '@xstate/svelte'
  import { counterMachine } from './machine'

  const { state, send, service } = useMachine(counterMachine)
  const count = useSelector(service, (state) => state.context.count)
  let step = 1
</script>

<div class="max-w-md mx-auto py-16 grid justify-items-center gap-8">
  <button
    class="btn variant-ghost p-2 text-center"
    on:click={() => send($state.matches('active') ? 'OFF' : 'ON')}
  >
    {$state.matches('active') ? 'ON' : 'OFF'}
  </button>

  <div class="w-16 text-center">
    {$count}
  </div>

  {#if $state.matches('active')}
    <div class="flex gap-4">
      {#each ['DEC', 'INC'] as command}
        <button class="btn variant-ghost" on:click={() => send(command, { step })}>
          {command}
        </button>
      {/each}
    </div>

    <div>
      <button class="btn btn-icon variant-ghost" on:click={() => step--}>-</button>
      {step}
      <button class="btn btn-icon variant-ghost" on:click={() => step++}>+</button>
    </div>
  {/if}
</div>
