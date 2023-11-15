<script lang="ts">
  import HeadlessTooltip from './HeadlessTooltip.svelte'
  import DialogConfirm from './dialogs/DialogConfirm.svelte'
</script>

<div class="gap-4 grid grid-cols-2">
  <div>
    <HeadlessTooltip let:toggle placement="top">
      <button class="btn variant-ghost-error" on:click={toggle}>DialogConfirm</button>

      <svelte:fragment slot="content" let:close let:isOpen>
        <DialogConfirm on:confirm={close} on:cancel={close} arrow={true} variant="danger" />
      </svelte:fragment>
    </HeadlessTooltip>
  </div>

  <div class="grid gap-4">
    <DialogConfirm variant="danger" arrow={false} focusTrap={false} backdrop={false} />
    <DialogConfirm variant="info" arrow={false} focusTrap={false} backdrop={false} />
    <DialogConfirm variant="neutral" arrow={false} focusTrap={false} backdrop={false} />
  </div>
</div>
