<script lang="ts">
  export let isAdmin = false
</script>

<div
  class="p-4 h-fit rounded border bg-surface-500/20"
  class:border-error-500={isAdmin}
  class:border-surface-500={!isAdmin}
>
  <slot />
</div>
