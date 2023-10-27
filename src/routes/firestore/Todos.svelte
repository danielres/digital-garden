<script lang="ts">
  import { getAppContext } from './appContext'
  import { renderDate } from './utils/date'
  import { truncate } from './utils/string'

  type FormOnSubmitEvent = Event & { currentTarget: EventTarget & HTMLFormElement }
  type FormOnSubmit = (e: FormOnSubmitEvent) => void

  const { todos } = getAppContext()

  const onSubmitTodo: FormOnSubmit = (e) => {
    const formEl = e.currentTarget
    if (!formEl) return
    const formData = new FormData(formEl)
    const text = (formData.get('text') ?? '') as string
    todos.add({ text })
    formEl.reset()
  }
</script>

{#each $todos as todo}
  <div class="variant-ghost p-2 stack">
    <dl class="grid grid-cols-[auto_1fr] gap-x-4">
      <dt>id</dt>
      <dd title={todo.id}>{truncate(todo.id, 6)}</dd>
      <dt>text</dt>
      <dd>{todo.text}</dd>
      <dt>complete</dt>
      <dd>
        <input
          type="checkbox"
          checked={todo.complete}
          on:click={() => todos.update(todo.id, { complete: !todo.complete })}
        />
      </dd>
      <dt>created at</dt>
      <dd>{todo.createdAt ? renderDate(todo.createdAt.toDate()) : '/'}</dd>
      <dt>updated at</dt>
      <dd>{todo.updatedAt ? renderDate(todo.updatedAt.toDate()) : '/'}</dd>
    </dl>
    <div class="self-start justify-self-end">
      <button type="button" on:click={() => todos.del(todo.id)}>Delete</button>
    </div>
  </div>
{/each}

<form on:submit|preventDefault={onSubmitTodo} class="grid grid-cols-[auto_1fr] items-center gap-4">
  <label class="contents">
    <span>Text</span>
    <input type="text" class="input" name="text" />
  </label>

  <button type="submit" class="btn variant-ghost-primary col-start-2">Add todo</button>
</form>
