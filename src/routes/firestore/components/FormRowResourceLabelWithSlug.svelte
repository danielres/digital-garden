<script lang="ts">
  import { paths } from '../utils/navigation'
  import { sanitizeFormInput, slugify, upperFirst } from '../utils/string'

  export let resource: { label: string; slug: string } & Record<string, any>
  const { resourceType } = resource
  let slug = slugify(resource.label)

  function getLabelText() {
    if (resourceType === 'person') return 'Display name'
    if (resourceType === 'content') return 'Title'
    if (resourceType === 'topic') return 'Topic'
    return 'Name'
  }
</script>

<label>
  <span>{getLabelText()}</span>
  <input
    name="label"
    type="text"
    class="textarea"
    value={resource.label ?? ''}
    on:input={(e) => {
      e.currentTarget.value = upperFirst(e.currentTarget.value)
      slug = slugify(e.currentTarget.value)
    }}
    on:change={(e) => {
      e.currentTarget.value = sanitizeFormInput(e.currentTarget.value)
    }}
  />

  <div class="ml-3 text-sm opacity-50 mt-1">
    {#if slug}
      {resourceType === 'person'
        ? paths.persons(slug)
        : resourceType === 'content'
        ? paths.contents(slug)
        : resourceType === 'topic'
        ? paths.topics(slug)
        : slug}
    {/if}

    <input type="hidden" name="slug" bind:value={slug} />
  </div>
</label>
