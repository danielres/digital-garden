<script lang="ts">
  import { Ratings } from '@skeletonlabs/skeleton'
  import * as Icons from './Icons'
  import type { ContentTrait } from './data'
  import { getContentsContext } from './useContents'

  export let contentTrait: Pick<ContentTrait, 'nodeId' | 'contentId' | 'scale'>
  export let interactive = true

  const { contentTraits } = getContentsContext()

  const confirmMessage = `Are you sure you want to remove this topic?`
</script>

<div class="flex gap-2 w-fit">
  <Ratings
    value={contentTrait.scale}
    max={5}
    {interactive}
    spacing="gap-[1px]"
    on:icon={(e) => {
      contentTraits.update(($contentTraits) => {
        const index = $contentTraits.findIndex(
          (t) => t.contentId === contentTrait.contentId && t.nodeId === contentTrait.nodeId
        )
        $contentTraits[index].scale = e.detail.index
        return $contentTraits
      })
    }}
  >
    <svelte:fragment slot="empty"><Icons.SquareEmpty /></svelte:fragment>
    <svelte:fragment slot="half"><Icons.SquareHalved /></svelte:fragment>
    <svelte:fragment slot="full"><Icons.Square /></svelte:fragment>
  </Ratings>

  {#if interactive}
    <button
      class="opacity-25 hover:opacity-100"
      on:click={() => confirm(confirmMessage) && contentTraits.remove(contentTrait)}
    >
      <Icons.Xmark />
    </button>
  {/if}
</div>
