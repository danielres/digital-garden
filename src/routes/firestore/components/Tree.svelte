<script lang="ts">
  import { getToastStore } from '@skeletonlabs/skeleton'
  import { get } from 'svelte/store'
  import { getAppContext, type Topic } from '../appContext'
  import { countOccurrences } from '../utils/array'
  import { paths } from '../utils/navigation'
  import { toast as _toast } from '../utils/toast'
  import * as Icons from './Icons'
  import MenuModes from './Tree/MenuModes.svelte'
  import NodeTree from './Tree/NodeTree.svelte'
  import { getTreeContext, setTreeContext } from './Tree/treeContext'

  const toast = _toast(getToastStore())

  const { topics, edges, traits, ui } = getAppContext()

  const onCopy = (e: CustomEvent<{ id: Topic['id']; newParentId: Topic['id'] }>) => {
    const { id, newParentId } = e.detail
    const result = edges.add({ parentId: newParentId, childId: id })

    if (!result.success && result.code === 'EDGE_ALEARY_EXISTS') {
      const topic = get(topics).find((t) => t.id === id)
      const parentTopic = get(topics).find((t) => t.id === newParentId)
      return toast(
        `Topic <b>"${topic?.label}"</b> already appears under <b>"${parentTopic?.label}"</b>`
      )
    }
  }

  const onMove = (e: CustomEvent<{ id: Topic['id']; newParentId: Topic['id'] }>) => {
    const { id, newParentId } = e.detail
    topics.move({ id, newParentId })
  }

  const onNewNode = async (e: CustomEvent<{ label: string; parentId: Topic['id'] }>) => {
    const { label, parentId } = e.detail
    const result = topics.add({ label, parentId })
    if (!result.success && result.code === 'TOPIC_ALREADY_EXISTS') {
      return toast(`Topic <b>"${label}"</b> already exists`)
    }
  }

  const onDelete = (e: CustomEvent<{ nodeId: Topic['id'] }>) => {
    const { nodeId } = e.detail
    topics.del(nodeId)
  }

  function getOccurences(topic: Topic) {
    if (!topic) return {}
    const topicTraits = $traits.filter((t) => t.topicId === topic.id)
    return countOccurrences(topicTraits.map((t) => t.targetKind))
  }

  setTreeContext()
  const { mode } = getTreeContext()

  $: if (!$ui.editing.value) $mode.type = 'view'
</script>

<div class="space-y-4">
  {#if $ui.editing.value}
    <MenuModes />
  {/if}

  <NodeTree on:copy={onCopy} on:move={onMove} on:newNode={onNewNode} on:delete={onDelete}>
    <span slot="nodeItem" let:data class="flex items-center gap-2">
      <a class="flex items-center clickable" href={paths.topics(data?.node?.slug)}>
        {data?.node?.name}
      </a>

      <div class="flex items-center gap-1 pt-1">
        {#each Object.entries(getOccurences(data.node)) as [targetKind, count]}
          <span class="flex items-center gap-0 opacity-75">
            {#if targetKind === 'person'}<Icons.UserMini />{/if}
            {#if targetKind === 'content'}<Icons.DocumentTextMini />{/if}
            <sup class="mt-1">{count}</sup>
          </span>
        {/each}
      </div>
    </span>
  </NodeTree>
</div>
