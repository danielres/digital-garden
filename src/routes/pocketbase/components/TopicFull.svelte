<script lang="ts">
  import { getAppContext } from '../appContext'
  import { traitTargetCollectionNames, type TopicSelect } from '../types.d'
  import { upperFirst } from '../utils/string'
  import Desc from './Desc.svelte'
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

  <hr />

  <div class="space-y-2">
    <PromiseLoader promise={topicTraitsPromise} let:result={topicTraits}>
      {#each traitTargetCollectionNames.filter((n) => n !== 'topics') as targetCollectionName}
        <h3>{upperFirst(targetCollectionName)}</h3>

        <div class="space-y-2">
          {#each topicTraits.filter(({ target }) => target.collectionName === targetCollectionName) as trait}
            <TraitGeneric {trait} />
          {/each}
        </div>
      {/each}
    </PromiseLoader>
  </div>
</div>
