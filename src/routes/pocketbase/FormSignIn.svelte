<script lang="ts">
  import { dev } from '$app/environment'
  import { getAppContext } from './appContext'

  const app = getAppContext()

  let authPromise: Promise<void>

  async function onSubmit(e: Event & { currentTarget: EventTarget & HTMLFormElement }) {
    const formEl = e.currentTarget as HTMLFormElement
    const formData = new FormData(formEl)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    authPromise = app.auth.admin.signin(email, password)
  }
</script>

<form class="grid gap-4 w-64" on:submit|preventDefault={onSubmit}>
  <label>
    <span>Email</span>
    <input class="input" name="email" type="text" />
  </label>

  <label>
    <span>Password</span>
    <input class="input" name="password" type="password" value={dev ? 'hellopocket' : ''} />
  </label>

  <button class="btn variant-soft">Sign in as admin</button>

  {#await authPromise catch error}
    <div class="card p-4 variant-glass-error text-error-700-200-token">
      {error.message}
    </div>
  {/await}
</form>
