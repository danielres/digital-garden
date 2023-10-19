<script lang="ts">
  import { useMachine } from '@xstate/svelte'
  import Mode from './Mode.svelte'
  import { nodes } from './data'
  import { nodeTreeMachine } from './machine'

  const { state, send, service } = useMachine(nodeTreeMachine)
</script>

<div class="max-w-lg mx-auto my-16 justify-items-center grid gap-4">
  <div>State value: {JSON.stringify($service.value, null, 2)}</div>
  <div>Context value: {JSON.stringify($service.context, null, 2)}</div>

  <div class="flex gap-4">
    {#each $service.nextEvents as nextEvent}
      <button class="btn variant-ghost" on:click={() => service.send(nextEvent)}>
        {nextEvent}
      </button>
    {/each}
  </div>
</div>

<Mode on:mode={({ detail: mode }) => service.send({ type: mode })} />

{#each nodes as node}
  <li>
    {node.value}
    {#if $service.matches({ add: 'ready' })}
      <button on:click={() => service.send({ type: 'SET PARENT', payload: { parentId: node.id } })}>
        ADD
      </button>
    {/if}
    {#if $service.matches({ add: 'show field' })}
      <input type="text" name="" id="" />
    {/if}
  </li>
{/each}
