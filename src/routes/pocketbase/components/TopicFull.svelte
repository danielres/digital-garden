<script lang="ts">
  import { getAppContext } from '../appContext'
  import type { TopicSelect } from '../types'
  import Muted from './Muted.svelte'
  import PromiseLoader from './PromiseLoader.svelte'
  import Trait from './Trait.svelte'

  export let topic: TopicSelect
  const app = getAppContext()

  $: topicTraitsPromise = app.queries.topics.traits({ id: topic.id })
</script>

<div>
  <h2>{topic.label}</h2>

  {#if topic.desc}
    <span class="opacity-75">{@html topic.desc}</span>
  {:else}
    <Muted>No description</Muted>
  {/if}
</div>

<hr />

<div>
  <PromiseLoader promise={topicTraitsPromise} let:result={topicTraits}>
    {#each Object.entries(topicTraits) as [collectionName, traits]}
      <h3>{collectionName}</h3>

      <div class="space-y-1">
        {#each traits as trait}
          <Trait {trait} />
        {:else}
          <Muted>No associated {collectionName}</Muted>
        {/each}
      </div>
    {/each}
  </PromiseLoader>
</div>

<!--
<div class="grid grid-cols-[auto_1fr] gap-4 items-center">
  <Avatar {topic} />

  <div>
    <h2>{topic.topicname}</h2>

    <div>
      {#if topic.desc}
        <span class="opacity-75">{topic.desc}</span>
      {:else}
        <Muted>No description</Muted>
      {/if}
    </div>
  </div>
</div>

<hr />

<PromiseLoader promise={traitsPromise} let:result={traits}>
  <div class="space-y-1">
    {#each traits as trait}
      <Trait {trait} />
    {:else}
      <Muted>No associated topics</Muted>
    {/each}
  </div>
</PromiseLoader> -->
