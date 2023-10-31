<script lang="ts">
  import MarkdownIt from 'markdown-it'

  export let text = ''

  const md = new MarkdownIt()
</script>

<div class="prose-sm">
  {@html md.render(String(text ?? ''))}
</div>
