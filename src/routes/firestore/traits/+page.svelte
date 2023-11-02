<script lang="ts">
  import { getAppContext, type Trait } from '../appContext'
  import { nestedify } from '../utils/forms'
  import FormFields from './[traitId]/FormFields.svelte'

  const { persons, topics, traits, contents } = getAppContext()
  type FormOnSubmitEvent = Event & { currentTarget: EventTarget & HTMLFormElement }
  type FormOnSubmit = (e: FormOnSubmitEvent) => void

  const onSubmitTrait: FormOnSubmit = (e) => {
    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    const values = Object.fromEntries(formData) as Record<string, string>
    const v = nestedify(values)
    traits.add(v)
    formEl.reset()
  }

  let targetKind: Trait['targetKind'] = 'person'
</script>

<form class="grid gap-4" on:submit|preventDefault={onSubmitTrait}>
  <label>
    <span>Target kind</span>
    <select name="targetKind" class="select" bind:value={targetKind}>
      <option value="person">Person</option>
      <option value="content">Content</option>
    </select>
  </label>

  {#if targetKind === 'person'}
    <label>
      <span>Person</span>
      <select name="targetId" class="select">
        {#each $persons as person}
          <option value={person.id}>{person.name}</option>
        {/each}
      </select>
    </label>

    <FormFields levels={{ interest: 3, expertise: 3 }} />
  {/if}

  {#if targetKind === 'content'}
    <label>
      <span>Content</span>
      <select name="targetId" class="select">
        {#each $contents as content}
          <option value={content.id}>{content.title}</option>
        {/each}
      </select>
    </label>

    <FormFields levels={{ relevancy: 3 }} />
  {/if}

  <button class="btn variant-ghost-primary rounded" type="submit">Add new trait</button>
</form>
