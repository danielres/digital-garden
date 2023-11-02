<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton'
  import type { Person } from '../appContext'
  import { getAppContext } from '../appContext'
  import ButtonDelete from './Buttons/ButtonDelete.svelte'
  import * as Icons from './Icons'
  import Markdown from './Markdown.svelte'
  import TraitLevels from './TraitLevels.svelte'
  import { paths } from '../utils/navigation'

  export let person: Person
  const { persons, traits, topics } = getAppContext()

  const personTraits = $traits.filter((t) => t.targetKind === 'person' && t.targetId === person.id)
</script>

<div class="">
  <div class="float-right">
    <ButtonDelete on:click={() => persons.del(person.id)} />
  </div>

  <a class="clickable flex gap-4 items-center" href={paths.persons(person.name)}>
    <Avatar width="w-8" src={person.picture} initials={person.name} />
    {person.name}
  </a>

  <div class="ml-12">
    <Markdown text={person.body} />
  </div>

  <div class="ml-12 text-sm grid grid-cols-[auto_2fr_1fr] gap-x-4 mt-2 items-center">
    {#each personTraits as trait}
      {@const topic = $topics.find((t) => trait.topicId === t.id)}

      <div class="contents">
        <span class="opacity-75">
          <a class="clickable" href={paths.topics(topic?.name)}>{topic?.name}</a>
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
</div>
