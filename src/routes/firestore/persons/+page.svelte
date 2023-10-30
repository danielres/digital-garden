<script lang="ts">
  import { getAppContext } from '../appContext'

  const { persons } = getAppContext()
  type FormOnSubmitEvent = Event & { currentTarget: EventTarget & HTMLFormElement }
  type FormOnSubmit = (e: FormOnSubmitEvent) => void

  const onSubmitPerson: FormOnSubmit = (e) => {
    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    const { name, body } = Object.fromEntries(formData) as Record<string, string>
    persons.add({ name, body })
    formEl.reset()
  }
</script>

<form class="space-y-4" on:submit|preventDefault={onSubmitPerson}>
  <label>
    <span>Name</span>
    <input class="textarea" type="text" name="name" />
  </label>

  <label>
    <span>Description</span>
    <textarea class="textarea" name="body" />
  </label>

  <button class="btn variant-ghost-primary rounded" type="submit">Add new Person</button>
</form>
