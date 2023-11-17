<script lang="ts">
  import { getAppContext } from '../appContext'
  import type { UserSelect } from '../types'
  import Avatar from './Avatar.svelte'
  import Muted from './Muted.svelte'
  import PromiseLoader from './PromiseLoader.svelte'
  import Trait from './Trait.svelte'

  export let user: UserSelect
  const app = getAppContext()

  $: traitsPromise = app.queries.item.traits(user)
</script>

<div class="grid grid-cols-[auto_1fr] gap-4 items-center">
  <Avatar {user} />

  <div>
    <h2>{user.username}</h2>

    <div>
      {#if user.desc}
        <span class="opacity-75">{user.desc}</span>
      {:else}
        <Muted>No description</Muted>
      {/if}
    </div>
  </div>
</div>

<hr />

<PromiseLoader promise={traitsPromise} let:result={traits}>
  <div class="space-y-1">
    {#each traits as trait}
      <Trait {trait} />
    {:else}
      <Muted>No associated topics</Muted>
    {/each}
  </div>
</PromiseLoader>
