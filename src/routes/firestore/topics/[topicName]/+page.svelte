<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import NodeTree from '../../Tree/NodeTree.svelte'
  import { setTreeContext } from '../../Tree/treeContext'
  import { getAppContext } from '../../appContext'
  import { renderDate } from '../../utils/date'
  import { paths } from '../../utils/navigation'

  setTreeContext()

  const { topics, edges } = getAppContext()

  $: topic = $topics.find((t) => t.name === $page.params.topicName)
  $: parentIds = $edges.filter((e) => topic && e.childId === topic.id).map((e) => e.parentId)
  $: parents = $topics.filter((t) => parentIds.includes(t.id))
</script>

{#if topic}
  <div class="grid grid-cols-[2fr_1fr] gap-4">
    <div class="">
      <h2>Topic: {topic.name}</h2>
      <p class="tex-sm opacity-75">Added on {renderDate(topic.createdAt.toDate())}</p>
    </div>

    <div class="grid variant-ghost p-4 gap-4">
      <div class="flex gap-2">
        {#each parents as parent, i}
          <button
            on:click={() => goto(paths.topics(parent.name))}
            class="opacity-50 text-sm clickable"
          >
            {parent.name}
          </button>
          {#if i < parents.length - 1}<span class="opacity-50 text-sm">|</span>{/if}
        {/each}
      </div>

      <div>
        <NodeTree
          nodeId={topic.id}
          on:nodeClicked={(e) => {
            const topicName = e.detail.nodeValue
            goto(paths.topics(topicName))
          }}
        />
      </div>
    </div>
  </div>
{/if}
