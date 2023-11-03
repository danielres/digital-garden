<script lang="ts">
  import { getAppContext } from '../appContext'
  import { paths } from '../utils/navigation'
  import { sanitizeFormInput, slugify, upperFirst } from '../utils/string'

  const { contents } = getAppContext()
  type FormOnSubmitEvent = Event & { currentTarget: EventTarget & HTMLFormElement }
  type FormOnSubmit = (e: FormOnSubmitEvent) => void

  const onSubmitContent: FormOnSubmit = (e) => {
    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    const { title, text, slug, url } = Object.fromEntries(formData) as Record<string, string>
    contents.add({ title, text, slug, url })
    formEl.reset()
  }

  let slug = ''
  let isValid = false
</script>

<form
  class="space-y-4"
  on:submit|preventDefault={onSubmitContent}
  on:input={(e) => {
    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    const { title, slug, text } = Object.fromEntries(formData)

    if (title.length < 3) return (isValid = false)
    if (slug.length < 3) return (isValid = false)
    if (text.length < 10) return (isValid = false)

    isValid = true
  }}
>
  <label>
    <span>Title</span>
    <input
      class="textarea"
      type="text"
      name="title"
      on:input={(e) => {
        e.currentTarget.value = upperFirst(e.currentTarget.value)
        slug = slugify(e.currentTarget.value)
      }}
      on:change={(e) => {
        e.currentTarget.value = sanitizeFormInput(e.currentTarget.value)
      }}
    />
    <div class="ml-3 text-sm opacity-50 mt-1">
      {#if slug}{paths.contents(slug)}{/if}
      <input type="hidden" name="slug" bind:value={slug} />
    </div>
  </label>

  <label>
    <span>Url</span>
    <input class="textarea" type="text" name="url" />
  </label>

  <label>
    <span>Text</span>
    <textarea class="textarea" name="text" />
  </label>

  <button disabled={!isValid} class="btn variant-ghost-primary rounded" type="submit">
    Add new content
  </button>
</form>
