<script lang="ts">
  import { page } from '$app/stores'
  import { getAppContext } from '../../appContext'
  import PromiseLoader from '../../components/PromiseLoader.svelte'
  import UserFull from './../../components/UserFull.svelte'

  const app = getAppContext()

  $: slug = $page.params.slug
  $: userPromise = app.queries.user.bySlug(slug)
</script>

<div class="space-y-4">
  <PromiseLoader promise={userPromise} let:result={user} error={`User "${slug}" not found.`}>
    <UserFull {user} />
  </PromiseLoader>
</div>
