<script lang="ts">
  import { getAppContext, type Topic, type Trait } from '../../appContext'
  import { upperFirst } from '../../utils/string'
  const { topics } = getAppContext()

  export let levels: Trait['levels']

  export let text: string | undefined = ''
  export let topic: Topic | undefined = undefined
</script>

{#if !topic}
  <label>
    <span>Topic</span>
    <select name="topicId" class="select">
      {#each $topics as topic}
        <option value={topic.id}>{topic.label}</option>
      {/each}
    </select>
  </label>
{/if}

<label>
  <span>Description</span>
  <textarea class="textarea" name="text">{text}</textarea>
</label>

<div class="grid grid-cols-[auto_1fr] gap-4 justify-between">
  {#each Object.entries(levels) as [kind, value]}
    <span class="text-right">{upperFirst(kind)}:</span>

    <div class="flex justify-between">
      {#each [0, 1, 2, 3, 4, 5] as v}
        <label>
          <span>{v}</span>
          <input type="radio" class="radio" name="levels.{kind}" checked={v == value} value={v} />
        </label>
      {/each}
    </div>
  {/each}
</div>
