<script lang="ts">
  import { getAppContext } from '../appContext'
  import FormFields from './FormFields.svelte'

  const { persons } = getAppContext()
  type FormOnSubmitEvent = Event & { currentTarget: EventTarget & HTMLFormElement }
  type FormOnSubmit = (e: FormOnSubmitEvent) => void

  const onSubmitPerson: FormOnSubmit = (e) => {
    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    const values = Object.fromEntries(formData) as Record<string, string>
    persons.add(values)
    formEl.reset()
  }

  function randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
</script>

<form class="space-y-4" on:submit|preventDefault={onSubmitPerson}>
  <FormFields
    person={{
      body: '',
      name: '',
      picture: `https://i.pravatar.cc/150?img=${randomBetween(1, 70)}`,
    }}
  />

  <button class="btn variant-ghost-primary rounded" type="submit">Add new Person</button>
</form>
