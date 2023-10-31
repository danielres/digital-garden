<script lang="ts">
  import { getAppContext } from '../appContext'
  import { paths } from '../utils/navigation'

  const { contents } = getAppContext()
</script>

<div class="grid grid-cols-2 gap-8">
  <div class="">
    {#each $contents as content, i}
      {#if i > 0}
        <hr />
      {/if}
      <div class="py-4">
        <a class="clickable flex gap-4 items-center" href={paths.contents(content.slug)}>
          {content.title}
        </a>
      </div>
    {/each}
  </div>

  <div class="variant-ghost p-4">
    <slot />
  </div>
</div>
