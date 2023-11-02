<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton'
  import { getAppContext, type Trait } from '../appContext'
  import * as Icons from '../components/Icons'
  import TraitLevels from '../components/TraitLevels.svelte'
  import { paths } from '../utils/navigation'
  import { truncate } from '../utils/string'
  import Markdown from './../components/Markdown.svelte'
  import Item from './Item.svelte'

  export let trait: Trait
  export let from: 'target' | 'topic' | 'trait'

  const { persons, topics, contents, traits } = getAppContext()

  $: topic = $topics.find((t) => t.id === trait.topicId)

  $: target =
    trait.targetKind === 'person'
      ? $persons.find((p) => p.id === trait.targetId)
      : trait.targetKind === 'content'
      ? $contents.find((p) => p.id === trait.targetId)
      : null

  const targetIconClasses = 'w-8 mr-4 p-2 variant-glass rounded-full'
</script>

{#if target && topic}
  <Item on:delete={() => traits.del(trait.id)}>
    <svelte:fragment slot="col1">
      {#if from === 'topic' || from === 'trait'}
        {#if trait.targetKind === 'person' && 'picture' in target}
          <Avatar src={target.picture} width="w-8 mr-4" />
        {:else if trait.targetKind === 'content'}
          <Icons.DocumentTextMini class={targetIconClasses} />
        {/if}
      {:else if from === 'target'}
        <Icons.BookmarkMini class={targetIconClasses} />
      {/if}
    </svelte:fragment>

    <svelte:fragment slot="col2">
      <a href={paths.traits(trait.id)} class="clickable">
        {#if from !== 'target'}
          {@const text = 'name' in target ? target.name : 'title' in target ? target.title : ''}
          {truncate(text)}
        {/if}
        {#if from === 'trait'}-{/if}
        {#if from !== 'topic'}{topic.name}{/if}
      </a>

      <TraitLevels {trait} />
      <Markdown text={trait.text} />
    </svelte:fragment>
  </Item>
{/if}
