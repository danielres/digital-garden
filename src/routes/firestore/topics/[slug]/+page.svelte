<script lang="ts">
  import { page } from '$app/stores'
  import { getAppContext } from '../../appContext'
  import Resource from './../../components/Resource.svelte'

  const { topics, resources } = getAppContext()

  $: slug = $page.params.slug
  $: resource = $topics.find((t) => t.slug === slug)

  function onSubmit(e: CustomEvent) {
    if (!resource) return
    const { id, resourceType } = resource
    resources.update({ id, resourceType, ...e.detail })
  }
</script>

{#if resource}
  <Resource {resource} on:submit={onSubmit} />
{:else}
  <div>Topic "{slug}" not found.</div>
{/if}
