import type { ToastStore } from '@skeletonlabs/skeleton'

export const toast = (toastStore: ToastStore) => (message: string) => {
  toastStore.trigger({
    message,
    classes: 'variant-ghost-surface ',
    background: 'text-white',
    timeout: 5000,
    hoverable: true,
  })
}
