<script lang="ts">
  import { getAppContext } from '../appContext'
  import * as Icons from '../components/Icons'
  import Item from '../components/Item.svelte'
  import Shell2Cols from '../components/Shell2Cols.svelte'
  import { paths } from '../utils/navigation'

  const { contents } = getAppContext()
  const targetIconClasses = 'w-8 mr-4 p-2 variant-glass rounded-full'
</script>

<Shell2Cols>
  <svelte:fragment slot="items">
    {#each $contents as content}
      <Item on:delete={() => contents.del(content.id)}>
        <svelte:fragment slot="col1">
          <Icons.DocumentTextMini class={targetIconClasses} />
        </svelte:fragment>

        <svelte:fragment slot="col2">
          <a class="clickable" href={paths.contents(content.slug)}>
            {content.title}
          </a>
        </svelte:fragment>
      </Item>
    {/each}
  </svelte:fragment>

  <svelte:fragment slot="main">
    <slot />
  </svelte:fragment>
</Shell2Cols>
