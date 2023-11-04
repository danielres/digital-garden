<script lang="ts">
  import { type Topic, type Content, type Person, type Trait, getAppContext } from '../appContext'
  import { onlyUnique } from '../utils/array'
  import { upperFirst } from '../utils/string'
  import Item from './Item.svelte'

  export let resource: Topic | Content | Person | Trait
  export let isEditing = false

  const resourceType = resource.resourceType
  const { traits } = getAppContext()

  $: resourceTraits =
    resourceType === 'topic'
      ? $traits.filter((t) => t.topicId === resource?.id)
      : $traits.filter((t) => t.targetId === resource?.id)

  $: itemsTabs = resourceTraits.map((t) => t.targetKind).filter(onlyUnique)
  $: itemsTabsCurrent = itemsTabs[0]
</script>

{#if resourceType === 'topic'}
  <div class="flex gap-2">
    {#each itemsTabs as targetKind}
      <button
        type="button"
        class="btn btn-sm rounded"
        class:variant-ghost-primary={itemsTabsCurrent === targetKind}
        class:variant-ghost={itemsTabsCurrent !== targetKind}
        on:click={() => (itemsTabsCurrent = targetKind)}
      >
        {upperFirst(targetKind)}s
      </button>
    {/each}
  </div>
{/if}

<div class="space-y-2">
  {#each resourceTraits.filter((t) => t.targetKind === itemsTabsCurrent) as trait (trait)}
    <Item item={trait} {isEditing} />
  {/each}
</div>
