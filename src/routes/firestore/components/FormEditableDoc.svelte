<script lang="ts">
  export let handleUpdate: (values: Record<string, string>) => void

  type FormOnSubmitEvent = Event & { currentTarget: EventTarget & HTMLFormElement }
  type FormOnSubmit = (e: FormOnSubmitEvent) => void

  const onSubmit: FormOnSubmit = (e) => {
    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    const values = Object.fromEntries(formData) as Record<string, string>
    handleUpdate(values)
    formEl.reset()
    isEditing = false
  }
  let isEditing = false
</script>

<div class="stack">
  <div class="grid gap-4">
    <h2><slot name="title" /></h2>

    {#if isEditing}
      <form on:submit|preventDefault={onSubmit} class="contents">
        <slot name="fields" />

        <button class="btn variant-ghost-primary rounded" type="submit">
          <slot name="buttonText">Update</slot>
        </button>
      </form>
    {:else}
      <slot name="content" />
    {/if}
  </div>

  <div class="justify-self-end">
    {#if isEditing}
      <button on:click={() => (isEditing = false)}>cancel</button>
    {:else}
      <button on:click={() => (isEditing = true)}>edit</button>
    {/if}
  </div>
</div>
