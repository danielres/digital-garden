<script lang="ts">
  import FormFields from './FormFields.svelte'
  import { page } from '$app/stores'
  import { Avatar } from '@skeletonlabs/skeleton'
  import { getAppContext } from '../../appContext'
  import FormEditableDoc from '../../components/FormEditableDoc.svelte'
  import Markdown from '../../components/Markdown.svelte'
  import TraitLevels from '../../components/TraitLevels.svelte'
  import { nestedify } from '../../utils/forms'
  import { paths } from '../../utils/navigation'
  import { truncate, upperFirst } from '../../utils/string'
  import * as Icons from '../../components/Icons'

  const { persons, traits, topics, contents } = getAppContext()

  $: traitId = $page.params.traitId
  $: trait = $traits.find((t) => t.id === traitId)
  $: topic = $topics.find((t) => t.id === trait?.topicId)

  const handleUpdate = (values: Record<string, string>) => {
    if (!trait) return
    const v = nestedify(values)
    traits.update(trait.id, values)
  }
</script>

{#if trait && topic}
  <FormEditableDoc {handleUpdate}>
    <svelte:fragment slot="title">
      {#if trait.targetKind === 'person'}
        {@const person = $persons.find((p) => p.id === trait?.targetId)}
        {#if person}
          <a href={paths.persons(person.name)} class="clickable inline-flex gap-2 items-center">
            <Avatar src={person.picture} width="w-8" />
            {person.name}
          </a>
        {/if}
      {/if}

      {#if trait.targetKind === 'content'}
        {@const content = $contents.find((p) => p.id === trait?.targetId)}
        {#if content}
          <a href={paths.contents(content.slug)} class="clickable inline-flex gap-2 items-center">
            <Icons.Link class="w-8 p-1 bg-primary-500 text-primary-900 rounded-sm" />
            {truncate(content.title)}
          </a>
        {/if}
      {/if}
      -
      <a href={paths.topics(topic.name)} class="clickable">{topic.name}</a>
    </svelte:fragment>

    <svelte:fragment slot="fields">
      <FormFields text={trait.text} levels={trait.levels} {topic} />
    </svelte:fragment>

    <svelte:fragment slot="content">
      <TraitLevels {trait} />
      <Markdown text={trait.text} />
    </svelte:fragment>

    <svelte:fragment slot="buttonText">Update trait</svelte:fragment>
  </FormEditableDoc>
{:else}
  <div>
    Trait "{traitId}" not found.
  </div>
{/if}
