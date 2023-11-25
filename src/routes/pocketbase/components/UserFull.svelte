<script lang="ts">
  import { getAppContext } from '../appContext'
  import type { UserNormalized } from '../types'
  import Avatar from './Avatar.svelte'
  import Desc from './Desc.svelte'
  import Muted from './Muted.svelte'
  import PromiseLoader from './PromiseLoader.svelte'
  import TraitGeneric from './TraitGeneric.svelte'

  export let user: UserNormalized
  const app = getAppContext()

  $: traitsSourcePromise = app.queries.traitsSource(user)
</script>

<div class="grid grid-cols-[auto_1fr] gap-4 items-center">
  <Avatar item={user} />

  <div>
    <h2>{user.label}</h2>

    <Desc text={user.desc} />
  </div>
</div>

<hr />

<PromiseLoader promise={traitsSourcePromise} let:result={{ traits }}>
  <div class="space-y-2">
    <h3>Topics</h3>

    <div class="space-y-1">
      {#each traits as trait}
        <TraitGeneric {trait} />
      {:else}
        <Muted>No associated topics</Muted>
      {/each}
    </div>
  </div>
</PromiseLoader>
