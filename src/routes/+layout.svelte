<script lang="ts">
  import { page } from '$app/stores'
  import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
  import { LightSwitch, storePopup } from '@skeletonlabs/skeleton'
  import '../app.postcss'
  import ThemeSwitch from './ThemeSwitch.svelte'

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow })
  let tabSet: number = 0

  const tabs = [
    { text: 'Palettes', path: '/palettes' },
    { text: 'Draw', path: '/draw' },
    { text: 'Paper.js', path: '/paperjs' },
    { text: 'Tagtree1', path: '/tagtree1' },
    { text: 'Tagtree2', path: '/tagtree2' },
    { text: 'Server side events', path: '/sse' },
    { text: 'Xstate-counter', path: '/xstate-counter' },
    { text: 'Xstate', path: '/xstate' },
    { text: 'Fsm', path: '/fsm' },
    { text: 'Sveltefire', path: '/sveltefire' },
    { text: 'Mandelbrot', path: '/mandelbrot' },
    { text: 'Firestore', path: '/firestore' },
    { text: 'Pocketbase', path: '/pocketbase' },
  ]

  $: currentPath = $page.url.pathname
</script>

<div class="p-4">
  <nav class="grid grid-cols-[1fr_auto] items-center">
    <ul class="flex text-xs flex-wrap gap-y-2">
      {#each tabs as tab}
        <li>
          <a
            class={`px-2 py-1 opacity-60 hover:opacity-100 transition-opacity ${
              currentPath.startsWith(tab.path) ? 'variant-glass-primary opacity-100' : ''
            }`}
            href={tab.path}
          >
            {tab.text}
          </a>
        </li>
      {/each}
    </ul>

    <div class="flex gap-2">
      <ThemeSwitch />
      <LightSwitch width="w-12" height="h-6" />
    </div>
  </nav>
</div>

<div class="overflow-y-auto">
  <slot />
</div>
