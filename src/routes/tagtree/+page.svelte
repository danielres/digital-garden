<script lang="ts">
  import TagTree from './TagTree.svelte'
  import { getTagsContext, setTagsContext, type Tag } from './useTags'

  let tags: Tag[] = [
    { value: 'root', id: 'root' },
    { value: 'tag1', id: '01', parents: ['root'] },
    { value: 'tag2', id: '02', parents: ['root'] },
    { value: 'tag3', id: '03', parents: ['root'] },
  ]

  setTagsContext(tags)
  const { dragAction } = getTagsContext()
</script>

<div class="space-y-4">
  <div class="flex gap-4">
    <label>
      <input type="radio" bind:group={$dragAction} value="move" />
      <span>Move</span>
    </label>

    <label>
      <input type="radio" bind:group={$dragAction} value="copy" />
      <span>Copy</span>
    </label>
  </div>

  <div>
    <TagTree />
  </div>
</div>
