<script lang="ts">
  import { getAppContext } from '../appContext'
  import type { TopicSelect } from '../types'
  import { upperFirst } from '../utils/string'
  import Desc from './Desc.svelte'
  import Muted from './Muted.svelte'
  import PromiseLoader from './PromiseLoader.svelte'
  import TraitGeneric from './TraitGeneric.svelte'

  export let topic: TopicSelect
  const app = getAppContext()

  $: topicTraitsPromise = app.queries.topics.traits(topic.id)
</script>

<div class="space-y-8">
  <div class="space-y-2">
    <h2>{topic.label}</h2>

    <Desc text={topic.desc} />
  </div>

  <div class="space-y-2">
    <PromiseLoader promise={topicTraitsPromise} let:result={topicTraits}>
      {#each Object.entries(topicTraits) as [collectionName, traits]}
        <h3>{upperFirst(collectionName)}</h3>

        <div class="space-y-2">
          {#each traits as trait}
            <TraitGeneric {trait} />
          {:else}
            <Muted>No associated {collectionName}</Muted>
          {/each}
        </div>
      {/each}
    </PromiseLoader>
  </div>
</div>
