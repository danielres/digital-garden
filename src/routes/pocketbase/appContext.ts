import PocketBase from 'pocketbase'
import { getContext, setContext } from 'svelte'
import { readable, writable } from 'svelte/store'
import { makeAuth } from './appContext/makeAuth'
import { makeQueries } from './appContext/makeQueries'
import type { UserCurrent, UserNormalized } from './types'
import { normalizeUser } from './utils/users'

type AppContext = ReturnType<typeof setAppContext>

export function setAppContext(url = 'http://127.0.0.1:8090') {
  const pb: PocketBase = new PocketBase(url)

  const store = readable<{ user?: UserNormalized }>({ user: undefined }, (set) => {
    pb.authStore?.model
      ? set({ user: normalizeUser(<UserCurrent>pb.authStore.model) })
      : set({ user: undefined })

    const unsubscribe = pb.authStore.onChange(() =>
      pb.authStore?.model
        ? set({ user: normalizeUser(<UserCurrent>pb.authStore.model) })
        : set({ user: undefined })
    )

    return unsubscribe
  })

  const ui = writable({
    tooltip: { id: <string | null>null },
  })

  const appContext = {
    ...store,
    files: pb.files,
    auth: makeAuth(pb),
    queries: makeQueries(pb),
    ui,
  }

  setContext('appContext', appContext)

  return appContext
}

export function getAppContext() {
  return getContext('appContext') as AppContext
}
