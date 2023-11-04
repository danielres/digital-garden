<script lang="ts">
  import { page } from '$app/stores'
  import { getAppContext, type Trait } from '../appContext'
  import { paths } from '../utils/navigation'
  import { truncate } from '../utils/string'

  export let trait: Trait

  const { traits, topics } = getAppContext()

  $: target = traits.findTarget(trait)
  $: topic = $topics.find((t) => t.id === trait.topicId)
  $: from = getFrom()

  function getFrom() {
    const pathname = $page.url.pathname
    if (pathname.startsWith(paths.topics())) return 'topic'
    if (pathname.startsWith(paths.traits())) return 'trait'
    return 'target'
  }

  function getTraitLinkText() {
    if (!target || !topic) return ''
    const from = getFrom()
    const topicLabel = truncate(topic.label)
    const targetLabel = truncate(target.label)
    if (from === 'topic') return targetLabel
    if (from === 'target') return topicLabel
    if (from === 'trait') return `${topicLabel} - ${targetLabel}`
  }

  function getTraitLinkHref() {
    if (!target || !topic) return ''
    const from = getFrom()
    if (from === 'topic') return paths.resource(target)
    if (from === 'target') return paths.resource(topic)
    if (from === 'trait') return paths.resource(trait)
  }
</script>

<a href={getTraitLinkHref()} class="clickable">{getTraitLinkText()}</a>
