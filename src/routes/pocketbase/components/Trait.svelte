<script lang="ts">
  import type { Trait } from '../types'
  import { paths } from '../utils/navigation'
  import { upperFirst } from '../utils/string'
  import Muted from './Muted.svelte'

  export let trait: Trait
</script>

<dl class="grid grid-cols-3 items-baseline text-sm">
  <dt>
    <a class="clickable" href={paths.topics(trait.slug)}>
      {trait.label}
    </a>
  </dt>

  <dd>{upperFirst(trait.kind)}: {trait.level}</dd>

  <dd class="rounded-xs variant-soft px-2 py-1">
    {#if trait.desc}
      {trait.desc}
    {:else}
      <Muted>No description</Muted>
    {/if}
  </dd>
</dl>
