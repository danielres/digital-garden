<script lang="ts">
  import Hsluv from './Palettes/Hsluv.svelte'
  import Superpal from './Palettes/Superpal.svelte'
</script>

<div class="max-w-4xl mx-auto my-8 grid gap-8 grid-cols-2 m-8 w-fit">
  <section class="card">
    <div class="grid gap-8 p-8">
      <h2 class="text-xl">Using hsluv-javascript</h2>
      <Hsluv />
    </div>
  </section>

  <section class="card">
    <div class="grid gap-8 p-8">
      <h2 class="text-xl">Using superpal</h2>
      <Superpal />
    </div>
  </section>

  <section class="card p-4 col-span-2">
    <b>HSLuv</b> and <b>OKHsl</b> are perceptually uniform color models, contrary to traditional
    <b>HSL</b>, which is physically accurate.
  </section>
</div>
