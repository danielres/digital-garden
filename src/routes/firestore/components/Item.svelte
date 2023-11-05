<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type { Content, Person, Trait } from '../appContext'
  import { getAppContext } from '../appContext'
  import { paths } from '../utils/navigation'
  import ButtonDelete from './Buttons/ButtonDelete.svelte'
  import * as Icons from './Icons'
  import Markdown from './Markdown.svelte'
  import ResourceIcon from './ResourceIcon.svelte'
  import TraitItemLink from './TraitItemLink.svelte'
  import TraitLevels from './TraitLevels.svelte'

  let _class = 'variant-glass-surface px-3 py-3 stack rounded'
  export { _class as class }

  const dispatch = createEventDispatcher()

  export let item: Content | Person | Trait

  const { traits, topics, ui } = getAppContext()
  $: isEditing = $ui.editing.value

  $: itemTraitsForTopicsList = $traits.filter((t) => t.targetId === item.id)
</script>

<div class={_class}>
  <div>
    <div class="grid grid-cols-[auto_1fr] gap-3">
      <div class="col1">
        <ResourceIcon resource={item} />
      </div>

      <div class="col2 space-y-1">
        {#if item.resourceType === 'trait'}
          <TraitItemLink trait={item} />
          <TraitLevels trait={item} {isEditing} />
        {:else}
          <a class="clickable flex gap-4 items-center" href={paths.resource(item)}>{item.label}</a>
        {/if}

        <div class="text-xs">
          {#if item.resourceType === 'trait' && isEditing}
            <textarea name="traits.{item.id}.text" class="textarea">{item.text}</textarea>
          {:else}
            <Markdown text={item.text} plainText />
          {/if}
        </div>

        {#if itemTraitsForTopicsList.length}
          <div class="text-sm grid grid-cols-[auto_2fr_1fr] gap-x-4 mt-2 items-center">
            {#each itemTraitsForTopicsList as trait}
              {@const topic = $topics.find((t) => trait.topicId === t.id)}
              <div class="contents">
                <span class="opacity-75">
                  <a class="clickable" href={paths.topics(topic?.label)}>{topic?.label}</a>
                  :
                </span>
                <TraitLevels {trait} />
                <div class="">
                  {#if trait.text}
                    <Icons.ChatBubbleEllipsis class="w-5 opacity-25" />
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>

  {#if isEditing}
    <div class="self-start justify-self-end">
      <ButtonDelete on:click={(event) => dispatch('delete', { item, event })} />
    </div>
  {/if}
</div>
