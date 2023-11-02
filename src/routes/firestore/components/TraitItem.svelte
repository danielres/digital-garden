<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton'
  import { getAppContext, type Trait } from '../appContext'
  import ButtonDelete from '../components/Buttons/ButtonDelete.svelte'
  import * as Icons from '../components/Icons'
  import TraitLevels from '../components/TraitLevels.svelte'
  import { paths } from '../utils/navigation'
  import { truncate } from '../utils/string'
  import Markdown from './../components/Markdown.svelte'

  export let trait: Trait

  let _class = 'variant-glass-surface px-3 py-4 stack'
  export { _class as class }

  const { traits, persons, topics, contents } = getAppContext()
  const topic = $topics.find((t) => t.id === trait.topicId)

  export let from: 'target' | 'topic' | 'trait'

  $: target =
    trait.targetKind === 'person'
      ? $persons.find((p) => p.id === trait.targetId)
      : trait.targetKind === 'content'
      ? $contents.find((p) => p.id === trait.targetId)
      : null
</script>

<div class={_class}>
  <div>
    <div class="grid grid-cols-[auto_1fr]">
      {#if target && topic}
        <div class="col1">
          {#if from === 'topic' || from === 'trait'}
            {#if trait.targetKind === 'person' && 'picture' in target}
              <Avatar src={target.picture} width="w-8 mr-4" />
            {:else if trait.targetKind === 'content'}
              <Icons.DocumentTextMini class="w-8 mr-4 p-2 variant-glass rounded-full" />
            {/if}
          {:else if from === 'target'}
            <Icons.BookmarkMini class="w-8 mr-4 p-2 variant-glass rounded-full" />
          {/if}
        </div>

        <div class="col2">
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
        </div>
      {/if}
    </div>
  </div>

  <div class="self-start justify-self-end">
    <ButtonDelete on:click={() => traits.del(trait.id)} />
  </div>
</div>
