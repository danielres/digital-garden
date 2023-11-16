<script lang="ts">
  import { getAppContext } from '../appContext'
  import Avatar from '../components/Avatar.svelte'
  import Card from '../components/Card.svelte'
  import type { UserSelect } from '../types'
  import { paths } from '../utils/navigation'

  const app = getAppContext()

  const recordsPromise = app.pb.collection<UserSelect>('users').getFullList({ sort: '-created' })
</script>

<div class="grid grid-cols-[1fr_2fr] gap-2">
  <div>
    {#await recordsPromise then records}
      <div class="space-y-2">
        {#each records as record}
          <a
            href={paths.users(record.slug)}
            class="grid grid-cols-[auto_1fr] card p-4 gap-4 items-center variant-soft-surface hover:variant-glass-surface"
          >
            <Avatar user={record} />
            <div>{record.username}</div>
          </a>
        {/each}
      </div>
    {/await}
  </div>

  <Card>
    <slot />
  </Card>
</div>
