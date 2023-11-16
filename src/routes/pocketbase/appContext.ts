import PocketBase, { type AuthModel } from 'pocketbase'
import { getContext, setContext } from 'svelte'
import { readable } from 'svelte/store'
import { makeAuth } from './appContext/makeAuth'

type AppContext = ReturnType<typeof setAppContext>

export function setAppContext(url = 'http://127.0.0.1:8090') {
  const pb: PocketBase = new PocketBase(url)

  const store = readable<{ user: AuthModel }>({ user: null }, (set) => {
    set({ user: pb.authStore?.model })
    const unsubscribe = pb.authStore.onChange(() => set({ user: pb.authStore?.model }))
    return unsubscribe
  })

  const appContext = {
    ...store,
    auth: makeAuth(pb),
    pb,
  }

  setContext('appContext', appContext)

  return appContext
}

export function getAppContext() {
  return getContext('appContext') as AppContext
}
