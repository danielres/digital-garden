<script lang="ts">
  import { page } from '$app/stores'
  import { getAppContext, type Content } from '../../appContext'
  import Resource from '../../components/Resource.svelte'
  import validate from '../../utils/validate'

  const { contents, resources } = getAppContext()

  $: slug = $page.params.slug
  $: resource = $contents.find((p) => p.slug === slug)

  function onSubmit(e: CustomEvent) {
    if (!resource) return
    const { id, resourceType } = resource
    resources.update({ id, resourceType, ...e.detail })
  }
</script>

{#if resource}
  <Resource {resource} on:submit={onSubmit} validate={validate.content} />
{:else}
  <div>Content "{slug}" not found.</div>
{/if}
