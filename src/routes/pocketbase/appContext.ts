import PocketBase from 'pocketbase'
import { getContext, setContext } from 'svelte'
import { readable, writable } from 'svelte/store'
import { makeAuth } from './appContext/makeAuth'
import { makeQueries } from './appContext/makeQueries'
import type { UserCurrent } from './types'

type AppContext = ReturnType<typeof setAppContext>

export function setAppContext(url = 'http://127.0.0.1:8090') {
  const pb: PocketBase = new PocketBase(url)

  const store = readable<{ user: UserCurrent | null }>({ user: null }, (set) => {
    set({ user: pb.authStore?.model as UserCurrent })

    const unsubscribe = pb.authStore.onChange(() =>
      set({ user: pb.authStore?.model as UserCurrent })
    )

    return unsubscribe
  })

  const ui = writable({
    tooltip: { id: <string | null>null },
  })

  const appContext = {
    ...store,
    auth: makeAuth(pb),
    queries: makeQueries(pb),
    pb,
    ui,
  }

  setContext('appContext', appContext)

  return appContext
}

export function getAppContext() {
  return getContext('appContext') as AppContext
}
