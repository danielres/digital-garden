<script lang="ts">
  import { getAppContext } from './appContext'
  import { renderDate } from './utils/date'

  type FormOnSubmitEvent = Event & { currentTarget: EventTarget & HTMLFormElement }
  type FormOnSubmit = (e: FormOnSubmitEvent) => void

  const { edges, topics } = getAppContext()

  const onSubmitTopic: FormOnSubmit = (e) => {
    const formEl = e.currentTarget
    if (!formEl) return
    const formData = new FormData(formEl)
    const parentId = (formData.get('parentId') ?? '') as string
    const childId = (formData.get('childId') ?? '') as string
    edges.add({ parentId, childId })
    formEl.reset()
  }
</script>

<ul>
  {#each $edges as edge}
    {@const parent = $topics.find((t) => t.id === edge.parentId)}
    {@const child = $topics.find((t) => t.id === edge.childId)}
    <li class="variant-ghost p-2 stack">
      <div>{parent?.name} - {child?.name}</div>
      <div class="self-start justify-self-end">
        <button type="button" on:click={() => edges.del(edge.id)}>Delete</button>
      </div>
    </li>
  {/each}
</ul>

<form on:submit|preventDefault={onSubmitTopic} class="grid grid-cols-[auto_1fr] items-center gap-4">
  <label class="contents">
    <span>ParentId</span>
    <select class="select" name="parentId">
      {#each $topics as topic}
        <option value={topic.id}>{topic.name}</option>
      {/each}
    </select>
  </label>

  <label class="contents">
    <span>ChildId</span>
    <select class="select" name="childId">
      {#each $topics as topic}
        <option value={topic.id}>{topic.name}</option>
      {/each}
    </select>
  </label>

  <button type="submit" class="btn variant-ghost-primary col-start-2">Add edge</button>
</form>
