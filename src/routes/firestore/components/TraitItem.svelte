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

  let _class = 'variant-glass-surface px-3 py-4'
  export { _class as class }

  const { traits, persons, topics, contents } = getAppContext()
  const topic = $topics.find((t) => t.id === trait.topicId)
</script>

<div class={_class}>
  <div class="float-right">
    <ButtonDelete on:click={() => traits.del(trait.id)} />
  </div>

  {#if trait.targetKind === 'person'}
    {@const person = $persons.find((p) => p.id === trait.targetId)}
    {#if person && topic}
      <div class="float-left"><Avatar src={person.picture} width="w-8" /></div>

      <a href={paths.traits(trait.id)} class="clickable ml-4">
        {person.name} - {topic.name}
      </a>
    {/if}
  {/if}

  {#if trait.targetKind === 'content'}
    {@const content = $contents.find((p) => p.id === trait.targetId)}
    {#if content && topic}
      <div class="float-left">
        <Icons.Link class="w-8 p-1 bg-primary-500 text-primary-900 rounded-sm" />
      </div>

      <a href={paths.traits(trait.id)} class="clickable ml-4">
        {truncate(content.title)} - {topic.name}
      </a>
    {/if}
  {/if}

  <div class="ml-12">
    <TraitLevels {trait} />

    <Markdown text={trait.text} />
  </div>
</div>
