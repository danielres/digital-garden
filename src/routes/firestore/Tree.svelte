<script lang="ts">
  import { getToastStore } from '@skeletonlabs/skeleton'
  import { get } from 'svelte/store'
  import { getAppContext, type Topic } from './appContext'
  import MenuModes from './Tree/MenuModes.svelte'
  import NodeTree from './Tree/NodeTree.svelte'
  import { setTreeContext } from './Tree/treeContext'
  import { paths } from './utils/navigation'
  import { toast as _toast } from './utils/toast'
  import { goto } from '$app/navigation'

  const toast = _toast(getToastStore())

  const { topics, edges } = getAppContext()

  const onCopy = (e: CustomEvent<{ id: Topic['id']; newParentId: Topic['id'] }>) => {
    const { id, newParentId } = e.detail
    const result = edges.add({ parentId: newParentId, childId: id })

    if (!result.success && result.code === 'EDGE_ALEARY_EXISTS') {
      const topic = get(topics).find((t) => t.id === id)
      const parentTopic = get(topics).find((t) => t.id === newParentId)
      return toast(
        `Topic <b>"${topic?.name}"</b> already appears under <b>"${parentTopic?.name}"</b>`
      )
    }
  }

  const onMove = (e: CustomEvent<{ id: Topic['id']; newParentId: Topic['id'] }>) => {
    const { id, newParentId } = e.detail
    topics.move({ id, newParentId })
  }

  const onNewNode = async (e: CustomEvent<{ name: string; parentId: Topic['id'] }>) => {
    const { name, parentId } = e.detail
    const result = topics.add({ name, parentId })
    if (!result.success && result.code === 'TOPIC_ALREADY_EXISTS') {
      return toast(`Topic <b>"${name}"</b> already exists`)
    }
  }

  const onNodeClicked = (e: CustomEvent<{ nodeId: Topic['id']; nodeValue: Topic['name'] }>) => {
    goto(paths.topics(e.detail.nodeValue))
  }

  const onDelete = (e: CustomEvent<{ nodeId: Topic['id'] }>) => {
    const { nodeId } = e.detail
    topics.del(nodeId)
  }

  setTreeContext()
</script>

<div class="space-y-4">
  <MenuModes />

  <NodeTree
    on:copy={onCopy}
    on:move={onMove}
    on:newNode={onNewNode}
    on:nodeClicked={onNodeClicked}
    on:delete={onDelete}
  />
</div>
