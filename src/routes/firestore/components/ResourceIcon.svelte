<script lang="ts">
  import { page } from '$app/stores'
  import { Avatar } from '@skeletonlabs/skeleton'
  import { getAppContext, type Content, type Person, type Topic, type Trait } from '../appContext'
  import { paths } from '../utils/navigation'
  import * as Icons from './Icons'

  export let resource: Person | Content | Trait | Topic

  const type = resource.resourceType

  export let size: 'sm' | 'md' = 'sm'

  const width = size === 'md' ? 'w-12' : 'w-8'
  const classes = `${width} p-2 variant-glass rounded-full`

  // Only for traits
  const { traits } = getAppContext()

  const from = getFrom()

  function getFrom() {
    const pathname = $page.url.pathname
    if (pathname.startsWith(paths.topics())) return 'topic'
    if (pathname.startsWith(paths.traits())) return 'trait'
    return 'target'
  }
  // End only for traits
</script>

{#if type === 'person'}
  <Avatar {width} src={resource.picture} initials={resource.label} />
{/if}

{#if type === 'content'}
  <Icons.DocumentTextMini class={classes} />
{/if}

{#if type === 'topic'}
  <Icons.BookmarkMini class={classes} />
{/if}

{#if type === 'trait'}
  {@const target = traits.findTarget(resource)}
  {#if from === 'topic' || from === 'trait'}
    {#if resource.targetKind === 'person' && target && 'picture' in target}
      <Avatar src={target.picture} {width} initials={target.label} />
    {:else if resource.targetKind === 'content'}
      <Icons.DocumentTextMini class={classes} />
    {/if}
  {:else if from === 'target'}
    <Icons.BookmarkMini class={classes} />
  {/if}
{/if}
