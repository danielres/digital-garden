<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton'
  import { createEventDispatcher } from 'svelte'
  import Tree from './NodeTree.svelte'
  import NodeView from './NodeView.svelte'
  import Panel from './Panel.svelte'
  import Persons from './Persons.svelte'
  import TraitRating from './TraitRating.svelte'
  import type { Person, Trait } from './data'
  import * as data from './data'
  import { getPersonsContext, setPersonsContext } from './usePersons'
  import { getTreeContext, setTreeContext } from './useTree'
  import { upperFirst } from './utils/string'

  setPersonsContext(data.persons, data.traits)

  setTreeContext(data.nodes, data.edges)
  const { dragAction, nodes } = getTreeContext()

  let currentNodeId: string | undefined = undefined
  $: currentNode = $nodes.find((n) => n.id === currentNodeId)

  function viewNode({ nodeId }: { nodeId: string; parentId?: string }) {
    currentNodeId = nodeId
  }

  // prettier-ignore
  let currentTraits: Trait[] = []

  let currentPerson: Person | undefined = undefined

  function closeAllPanels() {
    currentNodeId = undefined
    currentTraits = []
    currentPerson = undefined
  }

  const { traits, persons } = getPersonsContext()

  const dispatch = createEventDispatcher()
</script>

<div class="grid grid-cols-2 max-w-7xl mx-auto gap-8 my-8">
  <div class="">
    <Persons
      on:personClicked={({ detail }) => {
        closeAllPanels()
        currentPerson = detail
      }}
      on:personNodeClicked={({ detail }) => {
        closeAllPanels()
        const { nodeId, personId } = detail
        currentTraits = $traits.filter((t) => t.nodeId === nodeId && t.personId === personId)
      }}
    />
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

      <div class="">
        <Tree
          on:nodeClicked={({ detail }) => {
            closeAllPanels()
            viewNode(detail)
          }}
        />
      </div>
    </div>
  </div>
</div>

{#if currentNode}
  <Panel
    on:close={() => {
      closeAllPanels()
      currentNodeId = undefined
    }}
  >
    <NodeView
      on:personClicked={({ detail }) => {
        closeAllPanels()
        currentPerson = detail
      }}
      bind:node={currentNode}
    />
  </Panel>
{/if}

{#if currentPerson}
  <Panel
    on:close={() => {
      closeAllPanels()
      currentNodeId = undefined
    }}
  >
    <h2>{currentPerson.name}</h2>
    <div>{JSON.stringify(currentPerson)}</div>
  </Panel>
{/if}

{#if currentTraits.length}
  {@const personId = currentTraits[0].personId}
  {@const person = persons.findById(personId)}
  {@const node = nodes.findById(currentTraits[0].nodeId)}

  <Panel
    on:close={() => {
      closeAllPanels()
      currentTraits = []
    }}
  >
    <div class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-lg flex items-end gap-4">
          <Avatar src={person?.picture} />
          {person?.name ?? `Person with id ${personId} not found`}:
          <button
            class="clickable"
            on:click={() => {
              closeAllPanels()
              viewNode({ nodeId: node.id })
            }}
          >
            {upperFirst(node.value)}
          </button>
        </h2>
        <div class="text-sm">{person?.body}</div>
        <hr />
        <div class="text-sm">{node.body}</div>
      </div>
      <hr />
      <div class="space-y-4">
        {#each currentTraits as trait}
          <div class="">
            <div class="flex items-center gap-2 justify-between">
              <div class="font-bold">{upperFirst(trait.kind)}:</div>
              <TraitRating {trait} interactive={false} />
            </div>
            <p class="text-sm">{trait.body}</p>
          </div>
        {/each}
      </div>
    </div>
  </Panel>
{/if}
