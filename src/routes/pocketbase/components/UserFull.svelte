<script lang="ts">
  import { getAppContext } from '../appContext'
  import type { UserSelect } from '../types'
  import Avatar from './Avatar.svelte'
  import Desc from './Desc.svelte'
  import Muted from './Muted.svelte'
  import PromiseLoader from './PromiseLoader.svelte'
  import TraitGeneric from './TraitGeneric.svelte'

  export let user: UserSelect
  const app = getAppContext()

  $: traitsPromise = app.queries.item.traits(user.id)
</script>

<div class="grid grid-cols-[auto_1fr] gap-4 items-center">
  <Avatar record={user} />

  <div>
    <h2>{user.username}</h2>

    <Desc text={user.desc} />
  </div>
</div>

<hr />

<PromiseLoader promise={traitsPromise} let:result={traits}>
  <div class="space-y-1">
    {#each traits as trait}
      <TraitGeneric {trait} />
    {:else}
      <Muted>No associated topics</Muted>
    {/each}
  </div>
</PromiseLoader>
