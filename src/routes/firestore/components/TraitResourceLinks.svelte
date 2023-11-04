<script lang="ts">
  import { page } from '$app/stores'
  import { getAppContext, type Trait } from '../appContext'
  import { paths } from '../utils/navigation'
  import { truncate } from '../utils/string'

  export let trait: Trait

  const { traits, topics } = getAppContext()

  $: target = traits.findTarget(trait)
  $: topic = $topics.find((t) => t.id === trait.topicId)
</script>

{#if target && topic}
  <span class="flex gap-2">
    <a href={paths.resource(target)} class="clickable">{truncate(target.label)}</a>
    <span class="font-normal">-</span>
    <a href={paths.resource(topic)} class="clickable">{truncate(topic.label)}</a>
  </span>
{/if}
