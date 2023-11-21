<script lang="ts" generics="T">
  import Card from './Card.svelte'
  import Spinner from './Spinner.svelte'

  export let promise: Promise<T>
  export let error = 'Resource not found'
</script>

{#await promise}
  <Spinner />
{:then result}
  <slot {result} />
{:catch _}
  <Card variant="error">
    <slot name="error">{error}</slot>
  </Card>
{/await}
