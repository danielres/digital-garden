<script lang="ts">
  import Card from './Card.svelte'
  import Spinner from './Spinner.svelte'

  type T = $$Generic
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
