<script lang="ts">
  import { page } from '$app/stores'
  import { getAppContext, type Trait } from '../../appContext'
  import FormEditableDoc from '../../components/FormEditableDoc.svelte'
  import Markdown from '../../components/Markdown.svelte'
  import { paths } from '../../utils/navigation'

  const { persons, traits, topics } = getAppContext()

  $: traitId = $page.params.traitId
  $: trait = $traits.find((t) => t.id === traitId)
  $: person = $persons.find((p) => p.id === trait?.targetId)
  $: topic = $topics.find((t) => t.id === trait?.topicId)

  const handleUpdate = (values: Partial<Trait>) => {
    if (!trait) return
    traits.update(trait.id, values)
  }
</script>

{#if trait && person && topic}
  {#key trait}
    <FormEditableDoc {handleUpdate}>
      <div slot="title">
        <h2>
          <div>
            <a href={paths.persons(person.name)} class="clickable">{person.name}</a>
            -
            <a href={paths.topics(topic.name)} class="clickable">{topic.name}</a>
          </div>
          <div class="text-sm opacity-50">{trait.kind}: {trait.scale}</div>
        </h2>
      </div>

      <div slot="fields">
        <label>
          <span>Description</span>
          <textarea class="textarea" name="text">{trait.text ?? ''}</textarea>
        </label>

        <div>
          <span>Scale</span>
          <div class="flex gap-4 justify-center">
            {#each [0, 1, 2, 3, 4, 5] as v}
              <label>
                <span>{v}</span>
                <input type="radio" class="radio" name="scale" value={v} checked={v === 3} />
              </label>
            {/each}
          </div>
        </div>
      </div>

      <div slot="content">
        {#if trait.text}
          <Markdown text={trait.text} />
        {:else}
          <div class="text-sm opacity-50">No description provided</div>
        {/if}
      </div>

      <div slot="buttonText">Update trait</div>
    </FormEditableDoc>
  {/key}
{:else}
  <div>
    Trait "{traitId}" not found.
  </div>
{/if}
