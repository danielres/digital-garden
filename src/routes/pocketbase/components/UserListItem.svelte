<script lang="ts">
  import type { UserNormalized } from '../types'
  import { paths } from '../utils/navigation'
  import Avatar from './Avatar.svelte'

  export let user: UserNormalized
</script>

<a
  href={paths.users(user.slug)}
  class="grid grid-cols-[auto_1fr] card p-4 gap-4 items-center variant-soft-surface hover:variant-glass-surface"
>
  <Avatar item={user} md />
  <div>{user.label}</div>
</a>
