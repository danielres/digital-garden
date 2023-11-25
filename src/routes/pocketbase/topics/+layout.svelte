<script lang="ts">
  import { getAppContext } from '../appContext'
  import Card from '../components/Card.svelte'
  import PromiseLoader from '../components/PromiseLoader.svelte'
  import TopicListItem from '../components/TopicListItem.svelte'

  const app = getAppContext()

  const topicsPromise = app.queries.topics.list()
</script>

<div class="grid grid-cols-[1fr_2fr] gap-2">
  <div class="space-y-2">
    <PromiseLoader promise={topicsPromise} let:result={topics}>
      {#each topics as topic}
        <TopicListItem {topic} />
      {/each}
    </PromiseLoader>
  </div>

  <Card>
    <slot />
  </Card>
</div>
