<script lang="ts">
  import { page } from '$app/stores'
  import { getAppContext, type Topic } from '../../appContext'
  import FormEditableDoc from '../../components/FormEditableDoc.svelte'
  import Markdown from '../../components/Markdown.svelte'
  import { renderDate } from '../../utils/date'

  const { topics } = getAppContext()

  $: topicName = $page.params.topicName
  $: topic = $topics.find((t) => t.name === topicName)

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
          <div class="tex-sm opacity-75">Added on {renderDate(topic.createdAt.toDate())}</div>
        </div>

        <div slot="fields">
          <label>
            <span>Description</span>
            <textarea class="textarea" name="text">{topic.text ?? ''}</textarea>
          </label>
        </div>

        <div slot="content">
          {#if topic.text}
            <Markdown text={topic.text} />
          {:else}
            <div class="text-sm opacity-50">No description provided</div>
          {/if}
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
