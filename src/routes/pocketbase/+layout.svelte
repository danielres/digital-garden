<script lang="ts">
  import { page } from '$app/stores'
  import { twMerge } from 'tailwind-merge'
  import { getAppContext, setAppContext } from './appContext'
  import Avatar from './components/Avatar.svelte'
  import Card from './components/Card.svelte'
  import HeadlessTooltip from './components/HeadlessTooltip.svelte'
  import DialogConfirm from './components/dialogs/DialogConfirm.svelte'
  import AuthBox from './layout/AuthBox.svelte'
  import { renderDate } from './utils/date'
  import { paths } from './utils/navigation'
  import { upperFirst } from './utils/string'

  setAppContext()
  const app = getAppContext()
</script>

<div class="p-8 space-y-4 max-w-4xl mx-auto">
  {#if $app.user}
    <div class="grid grid-cols-[1fr_auto] gap-8 items-center">
      <ul class="flex gap-4">
        {#each Object.entries(paths) as [k, v]}
          <li>
            <a
              href={v()}
              class={twMerge(
                'btn',
                $page.url.pathname === v() ? 'variant-filled-primary' : 'variant-soft-primary'
              )}
            >
              {upperFirst(k)}
            </a>
          </li>
        {/each}
      </ul>

      <div class="justify-self-end">
        <HeadlessTooltip let:toggle placement="bottom">
          <button on:click={toggle}>
            <Avatar user={$app.user} />
          </button>

          <svelte:fragment slot="content" let:close>
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

                  <button
                    class="btn variant-soft"
                    on:click={() => {
                      close()
                      app.auth.signout()
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </Card>
            </DialogConfirm>
          </svelte:fragment>
        </HeadlessTooltip>
      </div>
    </div>
  {/if}

  {#if $app.user?.verified}
    <div>
      <slot />
    </div>
  {:else if $app.user}
    <Card variant="error">
      <h2>Hello {$app.user.username}!</h2>
      <p>Please remember to verify your email address.</p>
    </Card>
  {:else}
    <AuthBox />
  {/if}
</div>
