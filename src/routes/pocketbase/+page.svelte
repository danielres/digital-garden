<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton'
  import { getAppContext } from './appContext'

  const app = getAppContext()

  const recordsPromise = app.pb.collection('users').getFullList({
    sort: '-created',
  })
</script>

<pre>{JSON.stringify($app.user, null, 2)}</pre>

{#await recordsPromise then records}
  <div class="space-y-2 w-fit">
    {#each records as record}
      <div class="grid grid-cols-[auto_1fr] card p-4 gap-4">
        <Avatar initials={record.username} class="w-8" />
        <dl class="grid grid-cols-2 gap-x-2 [&_dt]:after:content-[':']">
          <dt>Username</dt>
          <dd>{record.username}</dd>
          <dt>Email</dt>
          <dd>{record.email}</dd>
        </dl>
      </div>
    {/each}
  </div>
{/await}
