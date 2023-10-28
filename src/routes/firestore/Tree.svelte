<script lang="ts">
  import MenuModes from './Tree/MenuModes.svelte'
  import NodeTree from './Tree/NodeTree.svelte'
  import { setTreeContext } from './Tree/treeContext'
  import { getAppContext, type Topic } from './appContext'
  const { topics, edges } = getAppContext()

  const onCopy = (e: CustomEvent<{ id: Topic['id']; newParentId: Topic['id'] }>) => {
    const { id, newParentId } = e.detail
    edges.add({ parentId: newParentId, childId: id })
  }

  const onMove = (e: CustomEvent<{ id: Topic['id']; newParentId: Topic['id'] }>) => {
    const { id, newParentId } = e.detail
    topics.move({ id, newParentId })
  }

  const onNewNode = async (e: CustomEvent<{ name: string; parentId: Topic['id'] }>) => {
    const { name, parentId } = e.detail
    topics.add({ name, parentId })
  }

  const onNodeClicked = (e: CustomEvent<{ nodeId: Topic['id'] }>) => {
    console.log('onNodeClicked', e.detail)
  }

  const onDelete = (e: CustomEvent<{ nodeId: Topic['id'] }>) => {
    const { nodeId } = e.detail
    console.log('onDelete', nodeId)
    topics.del(nodeId)
  }

  setTreeContext()
</script>

<MenuModes />

<NodeTree
  on:copy={onCopy}
  on:move={onMove}
  on:newNode={onNewNode}
  on:nodeClicked={onNodeClicked}
  on:delete={onDelete}
/>
