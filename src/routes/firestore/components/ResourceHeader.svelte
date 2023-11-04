<script lang="ts">
  import type { Person, Content, Topic, Trait } from '../appContext'
  import { renderDate } from '../utils/date'
  import ResourceIcon from './ResourceIcon.svelte'
  import TraitResourceLinks from './TraitResourceLinks.svelte'

  export let resource: Person | Content | Topic | Trait
  const { resourceType } = resource
</script>

<header class="grid grid-cols-[auto_1fr] gap-4">
  <ResourceIcon {resource} size="md" />

  <div>
    <h2>
      {#if resourceType === 'trait'}
        <TraitResourceLinks trait={resource} />
      {:else}
        {resource.label}
      {/if}
    </h2>

    <div class="text-xs font-normal w-full opacity-50">
      {#if resourceType === 'person'}Joined:{/if}
      {#if resourceType === 'topic'}Added:{/if}
      {#if resourceType === 'content'}Added:{/if}
      {renderDate(resource.createdAt.toDate())}
    </div>
  </div>
</header>
