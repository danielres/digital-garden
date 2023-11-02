<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton'
  import type { Person } from '../appContext'
  import { getAppContext } from '../appContext'
  import { paths } from '../utils/navigation'
  import * as Icons from './Icons'
  import Item from './Item.svelte'
  import Markdown from './Markdown.svelte'
  import TraitLevels from './TraitLevels.svelte'

  export let person: Person
  const { persons, traits, topics } = getAppContext()

  const personTraits = $traits.filter((t) => t.targetKind === 'person' && t.targetId === person.id)
</script>

<Item on:delete={() => persons.del(person.id)}>
  <svelte:fragment slot="col1">
    <Avatar width="w-8 mr-4" src={person.picture} initials={person.name} />
  </svelte:fragment>

  <svelte:fragment slot="col2">
    <a class="clickable flex gap-4 items-center" href={paths.persons(person.name)}>
      {person.name}
    </a>

    <Markdown text={person.body} />

    <div class="text-sm grid grid-cols-[auto_2fr_1fr] gap-x-4 mt-2 items-center">
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
  </svelte:fragment>
</Item>
