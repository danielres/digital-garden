<script lang="ts">
  import { page } from '$app/stores'
  import { getAppContext } from '../../appContext'
  import PromiseLoader from '../../components/PromiseLoader.svelte'
  import TopicFull from './../../components/TopicFull.svelte'

  const app = getAppContext()

  $: slug = $page.params.slug
  $: topicPromise = app.queries.topics.bySlug(slug)
</script>

<div class="space-y-4">
  <PromiseLoader promise={topicPromise} let:result={topic} error={`Topic "${slug}" not found.`}>
    <TopicFull {topic} />
  </PromiseLoader>
</div>
