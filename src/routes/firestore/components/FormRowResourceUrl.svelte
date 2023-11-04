<script lang="ts">
  import { truncate } from '../utils/string'
  import * as Icon from './Icons'

  export let resource: { url: string } & Record<string, any>
  export let isEditing = false
</script>

{#if isEditing}
  <label>
    <span>Url</span>
    <input class="textarea" type="text" name="url" value={resource.url ?? ''} />
  </label>
{:else}
  <a
    href={resource.url}
    target="_blank"
    class="flex gap-2 items-center text-sm font-normal underline underline-offset-4 opacity-50 hover:opacity-100"
  >
    {truncate(resource.url, 40)}
    <Icon.LinkExternal class="w-4" />
  </a>
{/if}
