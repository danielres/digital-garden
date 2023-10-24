<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import Contents from './Contents.svelte'
  import Tree from './NodeTree.svelte'
  import MenuModes from './NodeTree/MenuModes.svelte'
  import Panel from './Panel.svelte'
  import Persons from './Persons.svelte'
  import * as data from './data'
  import { setContentsContext } from './useContents'
  import { setPersonsContext } from './usePersons'
  import { getTreeContext, setTreeContext } from './useTree'

  setPersonsContext(data.persons, data.traits)
  setTreeContext(data.nodes, data.edges)
  setContentsContext(data.contents, data.contentTraits)

  const { nodes } = getTreeContext()
</script>

<div class="grid grid-cols-2 max-w-7xl mx-auto gap-8 my-8">
  <div class="">
    <Persons />
  </div>

  <div class="space-y-8">
    <div>
      <h2>Topics</h2>
      <div class="space-y-4 variant-soft p-4">
        <MenuModes />
        <Tree
          on:nodeClicked={({ detail: nodeId }) => goto(`/tagtree2/topics/${nodeId}`)}
          on:newNode={({ detail: { value, parentId } }) => nodes.add({ value, parentId })}
          on:copy={({ detail: { id, newParentId } }) => nodes.copy({ id, newParentId })}
          on:move={({ detail: { id, newParentId } }) => nodes.move({ id, newParentId })}
        />
      </div>
    </div>

    <div>
      <h2>Contents</h2>
      <div class="space-y-4 variant-soft p-4">
        <Contents />
      </div>
    </div>
  </div>
</div>

{#if $page.url.pathname !== '/tagtree2'}
  <Panel on:close={() => goto('/tagtree2')}>
    <slot />
  </Panel>
{/if}
