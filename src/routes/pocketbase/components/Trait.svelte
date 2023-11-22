<script lang="ts">
  import type { Trait } from '../types'
  import { paths } from '../utils/navigation'
  import { truncate, upperFirst } from '../utils/string'
  import Muted from './Muted.svelte'

  export let trait: Trait
</script>

<dl class="grid grid-cols-3 items-baseline text-sm">
  <dt>
    <a class="clickable" href={paths[trait.collectionName](trait.slug)}>
      {trait.label}
    </a>
  </dt>

  <dd>{upperFirst(trait.kind)}: {trait.level}</dd>

  <div class="rounded-xs variant-soft px-2 py-1 text-xs opacity-80">
    {#if trait.desc}
      {truncate(trait.desc)}
    {:else}
      <Muted>No description</Muted>
    {/if}
  </div>
</dl>
