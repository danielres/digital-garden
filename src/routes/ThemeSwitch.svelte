<script lang="ts">
  import { localStorageStore } from '@skeletonlabs/skeleton'
  import { onMount } from 'svelte'
  import { twMerge } from 'tailwind-merge'
  import configOptions from '../tailwind.config.plugins.skeleton'

  let _class = ''
  export { _class as class }

  const preferences = localStorageStore('ThemeSwitch', { index: 0 })
  const presets = (configOptions.themes?.preset as { name: string }[]) ?? []
  const names = presets.map((p) => p.name)

  function switchPreset() {
    $preferences.index = ($preferences.index + 1) % names.length
    updateDom()
  }

  function updateDom() {
    document.body.setAttribute('data-theme', names[$preferences.index])
  }

  onMount(updateDom)

  function upperFirst(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
</script>

<button
  class={twMerge(
    'h-6 text-xs ring-[1px] ring-surface-500/30 aspect-square font-bold text-surface-500-400-token',
    _class
  )}
  on:click={switchPreset}
  title="Theme: {upperFirst(names[$preferences.index])}"
>
  {upperFirst(names[$preferences.index][0])}
</button>
