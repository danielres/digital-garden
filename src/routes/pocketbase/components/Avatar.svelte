<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton'
  import { getAppContext } from '../appContext'
  import type { UserCurrent, UserSelect } from '../types'

  export let user: UserSelect | UserCurrent

  const app = getAppContext()
</script>

<Avatar
  width="w-12"
  border="border-2 border-surface-400-500-token"
  src="{app.pb.files.getUrl(user, user.avatar, { thumb: '64x0' })}}"
  initials={user.username}
/>
