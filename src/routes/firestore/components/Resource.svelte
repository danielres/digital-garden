<script lang="ts">
  import { focusTrap } from '@skeletonlabs/skeleton'
  import { createEventDispatcher } from 'svelte'
  import { getAppContext, type Content, type Person, type Topic, type Trait } from '../appContext'
  import Markdown from '../components/Markdown.svelte'
  import { getFormOnSubmitEventValues, type FormOnSubmit } from '../utils/forms'
  import FormRowResourceLabelWithSlug from './FormRowResourceLabelWithSlug.svelte'
  import FormRowResourceUrl from './FormRowResourceUrl.svelte'
  import ResourceHeader from './ResourceHeader.svelte'
  import ResourceTraitsItems from './ResourceTraitsItems.svelte'
  import TraitLevels from './TraitLevels.svelte'

  export let resource: Person | Content | Topic | Trait
  export let isNew = false

  const { ui } = getAppContext()

  $: isEditing = $ui.editing.value

  export let validate: (values: Record<string, any>) => boolean = () => true

  const dispatch = createEventDispatcher()

  $: resourceType = resource.resourceType

  const onSubmit: FormOnSubmit = (e) => {
    const formEl = e.currentTarget
    const values = getFormOnSubmitEventValues(e)
    dispatch('submit', values)
    formEl.reset()
    if (!isNew) ui.edit.end()
  }

  $: isValid = validate(resource)
</script>

<div class="stack">
  <form
    use:focusTrap={isNew || isEditing}
    class="grid gap-4"
    on:submit|preventDefault={onSubmit}
    on:input={(e) => {
      const values = getFormOnSubmitEventValues(e)
      isValid = validate(values)
    }}
  >
    {#if !isNew}
      <ResourceHeader {resource} />
    {/if}

    {#if 'label' in resource && 'slug' in resource}
      {#if isNew}
        <FormRowResourceLabelWithSlug {resource} />
      {/if}
    {/if}

    {#if 'picture' in resource}
      {#if isNew || isEditing}
        <label>
          <span>Picture url</span>
          <input type="text" class="textarea" name="picture" value={resource.picture ?? ''} />
        </label>
      {/if}
    {/if}

    {#if 'url' in resource}
      <FormRowResourceUrl {resource} isEditing={isNew || isEditing} />
    {/if}

    {#if 'text' in resource}
      {#if isNew || isEditing}
        <label>
          <span>Description</span>
          <textarea class="textarea" name="text">{resource.text}</textarea>
        </label>
      {:else}
        <Markdown text={resource.text} />
      {/if}
    {/if}

    {#if 'levels' in resource}
      <TraitLevels trait={resource} bind:isEditing />
    {/if}

    <ResourceTraitsItems {resource} />

    {#if isNew || isEditing}
      <button disabled={!isValid} class="btn variant-filled-error rounded" type="submit">
        {isNew ? 'Add new' : 'Update'}
        {resourceType}
      </button>
    {/if}
  </form>
</div>
