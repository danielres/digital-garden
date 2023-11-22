<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton'
  import { twMerge } from 'tailwind-merge'
  import { getAppContext } from '../appContext'
  import type { CollectionName } from '../types'

  export let border = false
  export let sm = false
  export let md = false

  export let record: {
    id: string
    avatar?: string
    label?: string
    collectionName?: CollectionName
    username?: string
  }

  const params = {
    id: record.id,
    collectionName: record.collectionName || 'users',
  }
  const initials =
    'label' in record ? record.label : 'username' in record ? record.username : undefined

  const app = getAppContext()
</script>

<Avatar
  class={twMerge('aspect-square', border && 'border-2 border-surface-400-500-token')}
  width={sm ? 'w-6' : md ? 'w-9' : 'w-12'}
  src={record.avatar
    ? app.pb.files.getUrl(params, record.avatar || '', { thumb: '64x0' })
    : undefined}
  {initials}
/>
