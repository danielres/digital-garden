<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import Tree from './NodeTree.svelte'
  import Panel from './Panel.svelte'
  import Persons from './Persons.svelte'
  import * as data from './data'
  import { setPersonsContext } from './usePersons'
  import { getTreeContext, setTreeContext } from './useTree'

  setPersonsContext(data.persons, data.traits)
  setTreeContext(data.nodes, data.edges)

  const { dragAction } = getTreeContext()
</script>

{#if $page.url.pathname !== '/tagtree2'}
  <Panel on:close={() => goto('/tagtree2')}>
    <slot />
  </Panel>
{/if}

<div class="grid grid-cols-2 max-w-7xl mx-auto gap-8 my-8">
  <div class="">
    <Persons />
  </div>

  <div>
    <h2>Topics</h2>

    <div class="space-y-4 variant-soft p-4">
      <div class="flex gap-4">
        <label>
          <input class="radio" type="radio" bind:group={$dragAction} value="move" />
          <span>Move</span>
        </label>
        <label>
          <input class="radio" type="radio" bind:group={$dragAction} value="copy" />
          <span>Copy</span>
        </label>
      </div>

      <Tree on:nodeClicked={({ detail: nodeId }) => goto(`/tagtree2/topics/${nodeId}`)} />
    </div>
  </div>
</div>
