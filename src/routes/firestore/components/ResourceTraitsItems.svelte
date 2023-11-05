<script lang="ts">
  import { getAppContext, type Content, type Person, type Topic, type Trait } from '../appContext'
  import { onlyUnique } from '../utils/array'
  import { upperFirst } from '../utils/string'
  import Item from './Item.svelte'
  import Tooltip from './Tooltip.svelte'

  export let resource: Topic | Content | Person | Trait

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

{#if resourceTraits.length}
  <div class="space-y-1">
    {#each resourceTraits.filter((t) => t.targetKind === itemsTabsCurrent) as trait, i (trait)}
      <Tooltip let:setAnchor let:confirm>
        <Item
          item={trait}
          on:delete={(e) => {
            const buttonEl = e.detail.event.currentTarget
            setAnchor(buttonEl)
            confirm(() => traits.del(trait.id))
          }}
        />

        <svelte:fragment slot="description">
          {@const topic = traits.findTopic(trait)}
          {@const target = traits.findTarget(trait)}

          <div class="grid gap-4">
            <div>Are you sure you want to remove this association?</div>

            {#if topic && target}
              <div class="grid grid-cols-2 justify-self-center -ml-2 gap-x-4">
                <div class="text-right">Topic:</div>
                <div class="font-bold">{topic.label}</div>
                <div class="text-right">{upperFirst(target.resourceType)}:</div>
                <div class="font-bold">{target.label}</div>
              </div>
            {/if}
          </div>
        </svelte:fragment>
      </Tooltip>
    {/each}
  </div>
{/if}
