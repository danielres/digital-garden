<script lang="ts">
  import FormSignIn from './FormSignIn.svelte'
  import FormSignup from './FormSignup.svelte'
  import { getAppContext, setAppContext } from './appContext'
  import Avatar from './components/Avatar.svelte'
  import Card from './components/Card.svelte'
  import HeadlessTooltip from './components/HeadlessTooltip.svelte'
  import DialogConfirm from './components/dialogs/DialogConfirm.svelte'
  import { renderDate } from './utils/date'

  setAppContext()
  const app = getAppContext()

  const tabs = ['Sign in', 'Sign up']
  let tabIdx = 0
</script>

<div class="p-8 space-y-8">
  {#if $app.user}
    <div class="grid justify-items-end">
      <HeadlessTooltip let:toggle placement="bottom">
        <button on:click={toggle}>
          <Avatar user={$app.user} />
        </button>

        <svelte:fragment slot="content">
          <DialogConfirm confirmButtons={false}>
            <Card bg={false}>
              <div class="text-left grid gap-4">
                <div>
                  <h3>{$app.user.username}</h3>
                  <div class="text-sm opacity-60">{$app.user.email}</div>
                </div>

                <dl class="grid grid-cols-[auto_1fr] gap-x-2 text-sm opacity-75">
                  <dt>Joined:</dt>
                  <dd>{renderDate(new Date($app.user.created))}</dd>

                  <dt>Verified?</dt>
                  <dd>{$app.user.verified ? 'yes' : 'no'}</dd>
                </dl>

                <button class="btn variant-soft" on:click={app.auth.signout}>Sign out</button>
              </div>
            </Card>
          </DialogConfirm>
        </svelte:fragment>
      </HeadlessTooltip>
    </div>
  {/if}

  {#if $app.user}
    {#if $app.user.verified}
      <slot />
    {:else}
      <Card variant="error">
        <h2>Hello {$app.user.username}!</h2>
        <p>Please remember to verify your email address.</p>
      </Card>
    {/if}
  {:else}
    <div class="grid gap-4 justify-items-center">
      <ul class="flex gap-4">
        {#each tabs as tab, i}
          <li>
            <button
              class="px-2 py-2 hover:opacity-100 transition-opacity border-surface-400-500-token"
              class:opacity-75={tabIdx !== i}
              class:border-b-2={tabIdx === i}
              class:opacity-100={tabIdx === i}
              type="button"
              on:click={() => (tabIdx = i)}
            >
              {tab}
            </button>
          </li>
        {/each}
      </ul>

      <div class="card variant-glass-surface p-8 w-fit max-w-md">
        {#if tabs[tabIdx] === 'Sign in'}
          <FormSignIn />
        {/if}
        {#if tabs[tabIdx] === 'Sign up'}
          <FormSignup />
        {/if}
      </div>
    </div>
  {/if}
</div>
