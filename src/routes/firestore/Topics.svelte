<script lang="ts">
  import { getAppContext } from './appContext'
  import { renderDate } from './utils/date'

  type FormOnSubmitEvent = Event & { currentTarget: EventTarget & HTMLFormElement }
  type FormOnSubmit = (e: FormOnSubmitEvent) => void

  const { topics } = getAppContext()

  const onSubmitTopic: FormOnSubmit = (e) => {
    const formEl = e.currentTarget
    if (!formEl) return
    const formData = new FormData(formEl)
    const name = (formData.get('name') ?? '') as string
    const text = (formData.get('text') ?? '') as string
    topics.add({ name, text })
    formEl.reset()
  }
</script>

<ul>
  {#each $topics as topic}
    {@const title = `
      id: ${topic.id},
      name: ${topic.name},
      text: ${topic.text},
      createdAt: ${topic.updatedAt ? renderDate(topic.createdAt.toDate()) : '/'},
      updatedAt: ${topic.updatedAt ? renderDate(topic.updatedAt.toDate()) : '/'},
    `}

    <li class="variant-ghost p-2 stack" {title}>
      <div>{topic.name}</div>
      <div class="self-start justify-self-end">
        <button type="button" on:click={() => topics.del(topic.id)}>Delete</button>
      </div>
    </li>
  {/each}
</ul>

<form on:submit|preventDefault={onSubmitTopic} class="grid grid-cols-[auto_1fr] items-center gap-4">
  <label class="contents">
    <span>Name</span>
    <input type="text" class="input" name="name" />
  </label>

  <button type="submit" class="btn variant-ghost-primary col-start-2">Add topic</button>
</form>
