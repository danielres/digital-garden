<script lang="ts">
  import { dev } from '$app/environment'
  import type { ClientResponseError } from 'pocketbase'
  import { getAppContext } from './appContext'
  import type { UserInsert, UserSelect } from './types'
  import Card from './components/Card.svelte'

  const app = getAppContext()

  let result: UserSelect | null = null
  let error: ClientResponseError | null = null

  async function onSubmit(e: Event & { currentTarget: EventTarget & HTMLFormElement }) {
    const formEl = e.currentTarget as HTMLFormElement
    const formData = new FormData(formEl)
    const entries = formData.entries()
    const values = Object.fromEntries(entries) as UserInsert
    app.auth
      .signup(values)
      .then((res) => (result = res))
      .catch((err) => (error = err))
  }
</script>

{#if result}
  <div class="space-y-4">
    <h2>Welcome {result.username}!</h2>
    {#if !result.verified}
      <p>We sent you an email with a link to verify your email address.</p>
    {/if}
  </div>
{:else}
  <form class="grid gap-4 w-64" on:submit|preventDefault={onSubmit}>
    <label>
      <span>Display name</span>
      <input class="input" name="username" type="text" value="Toto" />
    </label>

    <label>
      <span>Email</span>
      <input class="input" name="email" type="text" value="toto@example.com" />
    </label>

    <label>
      <span>Password</span>
      <input class="input" name="password" type="password" value={dev ? 'hellopocket' : ''} />
    </label>

    <label>
      <span>Password confirm</span>
      <input
        class="input"
        name="passwordConfirm"
        type="password"
        value={dev ? 'hellopocket' : ''}
      />
    </label>

    {#if error}
      <Card variant="error">
        {error.message}
      </Card>
    {/if}

    <button class="btn variant-soft">Sign up</button>
  </form>
{/if}
