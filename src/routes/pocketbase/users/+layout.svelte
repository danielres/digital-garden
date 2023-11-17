<script lang="ts">
  import { getAppContext } from '../appContext'
  import Card from '../components/Card.svelte'
  import PromiseLoader from '../components/PromiseLoader.svelte'
  import type { UserSelect } from '../types'
  import UserListItem from './../components/UserListItem.svelte'

  const app = getAppContext()

  const usersPromise = app.pb.collection<UserSelect>('users').getFullList({ sort: '-created' })
</script>

<div class="grid grid-cols-[1fr_2fr] gap-2">
  <div class="space-y-2">
    <PromiseLoader promise={usersPromise} let:result={users}>
      {#each users as user}
        <UserListItem {user} />
      {/each}
    </PromiseLoader>
  </div>

  <Card>
    <slot />
  </Card>
</div>
