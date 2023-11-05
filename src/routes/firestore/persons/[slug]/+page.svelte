<script lang="ts">
  import { page } from '$app/stores'
  import { getAppContext } from '../../appContext'
  import Panel from '../../components/Panel.svelte'
  import Resource from './../../components/Resource.svelte'

  const { persons, resources, ui } = getAppContext()

  $: slug = $page.params.slug
  $: resource = $persons.find((p) => p.slug === slug)

  function onSubmit(e: CustomEvent) {
    if (!resource) return
    const { id, resourceType } = resource
    resources.update({ id, resourceType, ...e.detail })
  }
</script>

<Panel isAdmin={$ui.editing.value}>
  {#if resource}
    <Resource {resource} on:submit={onSubmit} />
  {:else}
    <div>Person "{slug}" not found.</div>
  {/if}
</Panel>
