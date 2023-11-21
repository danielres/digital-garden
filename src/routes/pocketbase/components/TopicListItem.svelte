<script lang="ts">
  import type { TopicSelect } from '../types'
  import { paths } from '../utils/navigation'

  export let topic: TopicSelect
</script>

<a
  href={paths.topics(topic.slug)}
  class="grid grid-cols-[auto_1fr] card p-4 gap-4 items-center variant-soft-surface hover:variant-glass-surface"
>
  <div>{topic.label}</div>
</a>
