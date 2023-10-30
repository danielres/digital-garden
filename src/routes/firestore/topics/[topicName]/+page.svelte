<script lang="ts">
  import { page } from '$app/stores'
  import MarkdownIt from 'markdown-it'
  import { getAppContext } from '../../appContext'
  import { renderDate } from '../../utils/date'
  import Markdown from '../../Markdown.svelte'

  const { topics } = getAppContext()
  $: topic = $topics.find((t) => t.name === $page.params.topicName)

  type FormOnSubmitEvent = Event & { currentTarget: EventTarget & HTMLFormElement }
  type FormOnSubmit = (e: FormOnSubmitEvent) => void

  let isEditing = false

  const onUpdateTopic: FormOnSubmit = (e) => {
    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    const { text } = Object.fromEntries(formData) as Record<string, string>
    topic && topics.update(topic.id, { text })
    formEl.reset()
    isEditing = false
  }

  const md = new MarkdownIt()
</script>

{#if topic}
  <div class="variant-ghost p-4">
    <div class="stack">
      <div class="grid gap-4">
        <div>
          <h2>Topic: {topic.name}</h2>
          <div class="tex-sm opacity-75">Added on {renderDate(topic.createdAt.toDate())}</div>
        </div>

        {#if isEditing}
          <form on:submit|preventDefault={onUpdateTopic} class="contents">
            <label class="">
              <span>Description</span>
              <!-- prettier-ignore -->
              <textarea class="textarea" name="text" rows="4" cols="50">{topic.text ?? ''}</textarea>
            </label>
            <button class="btn variant-ghost-primary rounded" type="submit">Update</button>
          </form>
        {:else if topic.text}
          <Markdown text={topic.text} />
        {:else}
          <div class="text-sm opacity-50">No description provided</div>
        {/if}
      </div>

      <div class="justify-self-end">
        {#if !isEditing}
          <button on:click={() => (isEditing = true)}>edit</button>
        {/if}
      </div>
    </div>
  </div>
{/if}
