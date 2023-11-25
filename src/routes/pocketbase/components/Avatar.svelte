<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton'
  import { twMerge } from 'tailwind-merge'
  import { getAppContext } from '../appContext'
  import type { CollectionName } from '../types'

  export let border = false
  export let sm = false
  export let md = false

  export let item: {
    id: string
    label: string
    image?: string
    collectionName?: CollectionName
  }

  const { id, collectionName = 'users', image, label } = item

  const app = getAppContext()

  const src = image
    ? app.files.getUrl({ id, collectionName }, image || '', { thumb: '64x0' })
    : undefined
</script>

<Avatar
  class={twMerge('aspect-square', border && 'border-2 border-surface-400-500-token')}
  width={sm ? 'w-6' : md ? 'w-9' : 'w-12'}
  initials={label}
  {src}
/>
