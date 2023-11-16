<script lang="ts">
  import { dev } from '$app/environment'
  import type { ClientResponseError } from 'pocketbase'
  import { getAppContext } from './appContext'
  import type { UserInsert } from './types'
  import Card from './components/Card.svelte'

  const app = getAppContext()

  let error: ClientResponseError | null = null

  async function onSubmit(e: Event & { currentTarget: EventTarget & HTMLFormElement }) {
    const formEl = e.currentTarget as HTMLFormElement
    const formData = new FormData(formEl)
    const entries = formData.entries()
    const values = Object.fromEntries(entries) as UserInsert
    app.auth.signin(values.email, values.password).catch((err) => (error = err))
  }
</script>

<form class="grid gap-4 w-64" on:submit|preventDefault={onSubmit}>
  <label>
    <span>Email</span>
    <input class="input" name="email" type="text" value="toto@example.com" />
  </label>

  <label>
    <span>Password</span>
    <input class="input" name="password" type="password" value={dev ? 'hellopocket' : ''} />
  </label>

  {#if error}
    <Card variant="error">
      {error.message}
    </Card>
  {/if}

  <button class="btn variant-soft">Sign in</button>
</form>
