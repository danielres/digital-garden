<script lang="ts">
  import { twMerge } from 'tailwind-merge'

  let _class = ''
  export { _class as class }
</script>

<span class={twMerge('opacity-50', _class)}><slot /></span>
