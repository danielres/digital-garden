<script lang="ts">
  import { page } from '$app/stores'
  import { getAppContext } from '../../appContext'
  import Resource from '../../components/Resource.svelte'

  const { traits, resources } = getAppContext()

  $: traitId = $page.params.traitId
  $: resource = $traits.find((t) => t.id === traitId)

  function onSubmit(e: CustomEvent) {
    if (!resource) return
    const { id, resourceType } = resource
    resources.update({ id, resourceType, ...e.detail })
  }
</script>

{#if resource}
  <Resource {resource} on:submit={onSubmit} />
{:else}
  <div>Trait with id "{traitId}" not found.</div>
{/if}
