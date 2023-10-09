<script lang="ts">
  import { AppBar, AppShell } from '@skeletonlabs/skeleton'
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <strong class="text-xl uppercase">
          Generating color palettes with HSL / HSLuv / OKHSL
        </strong>
      </svelte:fragment>
      <svelte:fragment slot="trail" />
    </AppBar>
  </svelte:fragment>
  <slot />
</AppShell>
