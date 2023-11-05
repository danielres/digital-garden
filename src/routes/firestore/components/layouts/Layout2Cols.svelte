<script lang="ts">
  const hasSlotMain = $$slots.main
  const slotsCount = Object.keys($$slots).length
</script>

<div class="grid gap-4" class:grid-cols-2={slotsCount === 2}>
  <div class="space-y-1">
    <slot name="items" />
  </div>

  {#if hasSlotMain}
    <slot name="main" />
  {/if}
</div>
