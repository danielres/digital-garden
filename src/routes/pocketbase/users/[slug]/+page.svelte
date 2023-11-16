<script lang="ts">
  import { page } from '$app/stores'
  import { getAppContext } from '../../appContext'
  import Card from '../../components/Card.svelte'
  import type { UserSelect } from '../../types'
  import { renderDate } from '../../utils/date'

  const app = getAppContext()

  $: slug = $page.params.slug

  $: recordPromise = app.pb.collection('users').getFirstListItem(`slug="${slug}"`, {})
</script>

{#await recordPromise}
  <!-- recordPromise is pending -->
{:then user}
  <div class="grid gap-2">
    <div>
      <h3>{user.username}</h3>
    </div>

    <dl class="grid grid-cols-[auto_1fr] gap-x-2 text-sm opacity-75">
      <dt>Joined:</dt>
      <dd>{renderDate(new Date(user.created))}</dd>

      <dt>Verified?</dt>
      <dd>{user.verified ? 'yes' : 'no'}</dd>
    </dl>
  </div>
{:catch error}
  {error.message}
{/await}
