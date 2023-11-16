<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton'
  import { getAppContext } from '../appContext'

  const app = getAppContext()

  const recordsPromise = app.pb.collection('users').getFullList({ sort: '-created' })
</script>

{#await recordsPromise then records}
  <div class="space-y-2">
    {#each records as record}
      <div class="grid grid-cols-[auto_1fr] card p-4 gap-4 items-center variant-soft-surface">
        <Avatar initials={record.username} class="w-8" />

        <div>{record.username}</div>
      </div>
    {/each}
  </div>
{/await}
