<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import ButtonDelete from '../components/Buttons/ButtonDelete.svelte'

  let _class = 'variant-glass-surface px-3 py-4 stack'
  export { _class as class }

  const dispatch = createEventDispatcher()

  const hasSlot1 = !!$$slots.col1
</script>

<div class={_class}>
  <div>
    <div class="grid" class:grid-cols-[auto_1fr]={hasSlot1}>
      {#if hasSlot1}
        <div class="col1">
          <slot name="col1" />
        </div>
      {/if}

      <div class="col2">
        <slot name="col2" />

        <!-- <TraitLevels {trait} />
        <Markdown text={trait.text} /> -->
      </div>
    </div>
  </div>

  <div class="self-start justify-self-end">
    <ButtonDelete on:click={() => dispatch('delete')} />
  </div>
</div>
