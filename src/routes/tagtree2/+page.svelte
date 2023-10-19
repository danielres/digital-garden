<script lang="ts">
  import Tree from './NodeTree.svelte'
  import NodeView from './NodeView.svelte'
  import Panel from './Panel.svelte'
  import Persons from './Persons.svelte'
  import TraitRating from './TraitRating.svelte'
  import * as data from './data'
  import { getPersonsContext, setPersonsContext, type Person, type Trait } from './usePersons'
  import { getTreeContext, setTreeContext } from './useTree'
  import { upperFirst } from './utils/string'

  setPersonsContext(data.persons, data.traits)

  setTreeContext(data.nodes, data.edges)
  const { dragAction, nodes } = getTreeContext()

  let currentNodeId: string | undefined = undefined
  $: currentNode = $nodes.find((n) => n.id === currentNodeId)

  function viewNode({ nodeId }: { nodeId: string; parentId: string }) {
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
    <div class="">
      <h2 class="text-lg">{upperFirst(node.value)}</h2>
      <p class="text-sm">{node.body}</p>
    </div>

    <div class="space-y-2">
      <h2>{person?.name ?? `Person with id ${personId} not found`}</h2>

      {#each currentTraits as trait}
        <div class="variant-ghost p-4">
          <div class="flex justify-end items-center gap-2">
            <div class="">{upperFirst(trait.kind)}:</div>
            <TraitRating {trait} interactive={false} />
          </div>
          <p class="">{trait.body}</p>
        </div>
      {/each}
    </div>
  </Panel>
{/if}
