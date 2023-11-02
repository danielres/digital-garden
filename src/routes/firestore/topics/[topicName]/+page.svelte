<script lang="ts">
  import { page } from '$app/stores'
  import { getAppContext, type Topic } from '../../appContext'
  import FormEditableDoc from '../../components/FormEditableDoc.svelte'
  import Markdown from '../../components/Markdown.svelte'
  import TraitItem from '../../components/TraitItem.svelte'
  import { onlyUnique } from '../../utils/array'
  import { renderDate } from '../../utils/date'
  import { upperFirst } from '../../utils/string'

  const { topics, traits } = getAppContext()

  $: topicName = $page.params.topicName
  $: topic = $topics.find((t) => t.name === topicName)
  $: topicTraits = $traits.filter((t) => t.topicId === topic?.id)

  const handleUpdate = (values: Partial<Topic>) => {
    if (!topic) return
    topics.update(topic.id, values)
  }

  $: tab = topicTraits[0]?.targetKind ?? 'person'
</script>

<div class="variant-ghost p-4">
  {#if topic}
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

        <div class="flex gap-2">
          {#each topicTraits.map((t) => t.targetKind).filter(onlyUnique) as targetKind}
            <button
              class="btn btn-sm rounded"
              class:variant-ghost-primary={tab === targetKind}
              class:variant-ghost={tab !== targetKind}
              on:click={() => (tab = targetKind)}
            >
              {upperFirst(targetKind)}s
            </button>
          {/each}
        </div>

        <ul class="grid gap-2">
          {#each topicTraits.filter((t) => t.targetKind === tab) as trait}
            <TraitItem {trait} from="topic" />
          {/each}
        </ul>
      </div>

      <div slot="buttonText">Update topic</div>
    </FormEditableDoc>
  {:else}
    <div>
      Topic {topicName} not found.
    </div>
  {/if}
</div>
