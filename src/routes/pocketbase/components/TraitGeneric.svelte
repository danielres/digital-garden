<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import type { TraitGeneric } from '../types'
  import { paths } from '../utils/navigation'
  import { upperFirst } from '../utils/string'
  import Avatar from './Avatar.svelte'
  import Desc from './Desc.svelte'
  import Muted from './Muted.svelte'

  export let trait: TraitGeneric
  export let levelKinds = ['expertise', 'interest']

  const hasImage = 'image' in trait.target
</script>

<dl class="grid grid-cols-[1fr_2fr_3fr] text-sm items-baseline gap-8">
  <dt class={twMerge(hasImage && 'grid grid-cols-[auto_1fr] gap-3 items-baseline')}>
    {#if hasImage}
      <div class="self-center">
        <Avatar item={trait.target} sm />
      </div>
    {/if}
    <a class="clickable" href={paths[trait.target.collectionName](trait.target.slug)}>
      {trait.target.label}
    </a>
  </dt>

  <dd class="">
    {#each levelKinds as kind}
      <div class="flex">
        <span>{upperFirst(kind)}:</span>
        <span class="flex-grow text-right">
          {#if trait.levels[kind]}
            {trait.levels[kind]}
          {:else}
            <Muted class="text-xs">N/A</Muted>
          {/if}
        </span>
      </div>
    {/each}
  </dd>

  <!-- <dd>{upperFirst(trait.kind)}: {trait.level}</dd> -->

  <Desc text={trait.desc} preview class="h-full" />
</dl>
