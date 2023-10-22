<script lang="ts">
  import Tree from './NodeTree.svelte'
  import NodeView from './NodeView.svelte'
  import Panel from './Panel.svelte'
  import Persons from './Persons.svelte'
  import PersonAvatarAndName from './Persons/PersonAvatarAndName.svelte'
  import PersonTraitsTable from './Persons/PersonTraitsTable.svelte'
  import TraitRating from './TraitRating.svelte'
  import type { Person, Trait, Node } from './data'
  import * as data from './data'
  import { getPersonsContext, setPersonsContext } from './usePersons'
  import { getTreeContext, setTreeContext } from './useTree'
  import { upperFirst } from './utils/string'

  setPersonsContext(data.persons, data.traits)

  setTreeContext(data.nodes, data.edges)
  const { dragAction, nodes } = getTreeContext()

  let currentNodeId: string | undefined = undefined
  $: currentNode = $nodes.find((n) => n.id === currentNodeId)

  function viewNode(nodeId: Node['id']) {
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
            console.log('nodeClicked', detail)

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
    <div class="space-y-4">
      <PersonAvatarAndName person={currentPerson} />
      <div class="text-sm">{@html currentPerson?.body}</div>
    </div>

    <div class="variant-soft rounded">
      <PersonTraitsTable
        person={currentPerson}
        on:personNodeClicked={({ detail }) => {
          closeAllPanels()
          const { nodeId, personId } = detail
          currentTraits = $traits.filter((t) => t.nodeId === nodeId && t.personId === personId)
        }}
      />
    </div>
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
        <h2 class="text-lg flex items-end gap-2">
          <PersonAvatarAndName {person} />:
          <button
            class="clickable"
            on:click={() => {
              closeAllPanels()
              viewNode(node.id)
            }}
          >
            {upperFirst(node.value)}
          </button>
        </h2>
        <div class="text-sm">{@html person?.body}</div>
      </div>

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

      <hr />

      <div class="text-sm">{@html node.body}</div>
    </div>
  </Panel>
{/if}
