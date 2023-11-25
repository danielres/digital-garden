<script lang="ts">
  import { twMerge } from 'tailwind-merge'
  import type { TraitGeneric } from '../types'
  import { paths } from '../utils/navigation'
  import { upperFirst } from '../utils/string'
  import Avatar from './Avatar.svelte'
  import Desc from './Desc.svelte'

  export let trait: TraitGeneric

  const isUser = trait.target.collectionName === 'users'
</script>

<dl class="grid grid-cols-3 text-sm items-center">
  <dt class={twMerge(isUser && 'grid grid-cols-[auto_1fr] gap-3 items-center')}>
    {#if isUser}
      <div class="self-center">
        <Avatar item={trait.target} sm />
      </div>
    {/if}
    <a class="clickable" href={paths[trait.target.collectionName](trait.target.slug)}>
      {trait.target.label}
    </a>
  </dt>

  <dd>{upperFirst(trait.kind)}: {trait.level}</dd>

  <Desc text={trait.desc} preview />
</dl>
