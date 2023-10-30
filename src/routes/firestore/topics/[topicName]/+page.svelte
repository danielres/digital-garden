<script lang="ts">
  import { page } from '$app/stores'
  import { Avatar } from '@skeletonlabs/skeleton'
  import { groupByKey } from '../../../tagtree2/utils/object'
  import { getAppContext, type Topic } from '../../appContext'
  import FormEditableDoc from '../../components/FormEditableDoc.svelte'
  import Markdown from '../../components/Markdown.svelte'
  import { renderDate } from '../../utils/date'
  import { paths } from '../../utils/navigation'
  import { upperFirst } from '../../utils/string'

  const { topics, traits, persons } = getAppContext()

  $: topicName = $page.params.topicName
  $: topic = $topics.find((t) => t.name === topicName)
  $: topicTraits = groupByKey(
    $traits.filter((t) => t.topicId === topic?.id),
    'targetKind'
  )

  const handleUpdate = (values: Partial<Topic>) => {
    if (!topic) return
    topics.update(topic.id, values)
  }
</script>

<div class="variant-ghost p-4">
  {#if topic}
    {#key topic}
      <FormEditableDoc {handleUpdate}>
        <div slot="title">
          <h2>Topic: {topic.name}</h2>
          <div class="text-sm opacity-50 font-normal">
            Added on {renderDate(topic.createdAt.toDate())}
          </div>
        </div>

        <div slot="fields">
          <label>
            <span>Description</span>
            <textarea class="textarea" name="text">{topic.text ?? ''}</textarea>
          </label>
        </div>

        <div slot="content" class="grid gap-4">
          {#if topic.text}
            <Markdown text={topic.text} />
          {:else}
            <div class="text-sm opacity-50">No description provided</div>
          {/if}

          <div>
            {#each Object.keys(topicTraits) as targetKind}
              <button class="btn btn-sm rounded variant-ghost-primary">
                {upperFirst(targetKind)}s
              </button>
            {/each}
          </div>

          <ul class="grid gap-4">
            {#each Object.entries(topicTraits) as [targetKind, traits2]}
              {#each Object.entries(groupByKey(traits2, 'targetId')) as [targetId, traits]}
                {#if targetKind === 'person'}
                  {@const person = $persons.find((p) => p.id === targetId)}

                  {#if person}
                    <li class="space-y-2">
                      <h3 class="flex gap-2 items-center">
                        <Avatar src={person.picture} width="w-8" />
                        <a href={paths.persons(person.name)} class="clickable">{person.name}</a>
                      </h3>

                      <ul class="grid gap-1">
                        {#each traits as trait}
                          {@const topic = $topics.find((t) => trait.topicId === t.id)}

                          <li class="px-4 py-2 variant-soft rounded-md">
                            {trait.kind}: {trait.scale}
                            <Markdown text={trait.text} />
                          </li>
                        {/each}
                      </ul>
                    </li>
                  {/if}
                {/if}
              {/each}
            {/each}
          </ul>
        </div>

        <div slot="buttonText">Update person</div>
      </FormEditableDoc>
    {/key}
  {:else}
    <div>
      Topic {topicName} not found.
    </div>
  {/if}
</div>
