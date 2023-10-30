<script lang="ts">
  import { getAppContext, type Trait } from '../appContext'

  const { persons, topics, traits } = getAppContext()
  type FormOnSubmitEvent = Event & { currentTarget: EventTarget & HTMLFormElement }
  type FormOnSubmit = (e: FormOnSubmitEvent) => void

  const onSubmitTrait: FormOnSubmit = (e) => {
    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    const values = Object.fromEntries(formData) as Record<string, string>
    traits.add(values)
    // formEl.reset()
  }

  let targetKind: Trait['targetKind'] = 'person'
</script>

<form class="grid gap-4" on:submit|preventDefault={onSubmitTrait}>
  <label>
    <span>Target kind</span>
    <select name="targetKind" class="select" bind:value={targetKind}>
      <option value="person">Person</option>
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
  {/if}

  <label>
    <span>Topic</span>
    <select name="topicId" class="select">
      {#each $topics as topic}
        <option value={topic.id}>{topic.name}</option>
      {/each}
    </select>
  </label>

  <div>
    <span>Kind</span>
    <div class="flex gap-4 justify-center">
      {#each ['interest', 'expertise'] as kind}
        <label>
          <span>{kind}</span>
          <input
            type="radio"
            class="radio"
            name="kind"
            value={kind}
            checked={kind === 'interest'}
          />
        </label>
      {/each}
    </div>
  </div>

  <div>
    <span>Scale</span>
    <div class="flex gap-4 justify-center">
      {#each [0, 1, 2, 3, 4, 5] as v}
        <label>
          <span>{v}</span>
          <input type="radio" class="radio" name="scale" value={v} checked={v === 3} />
        </label>
      {/each}
    </div>
  </div>

  <button class="btn variant-ghost-primary rounded" type="submit">Add new trait</button>
</form>
