<script lang="ts">
  import { getAppContext, type Person } from '../appContext'
  import { paths } from '../utils/navigation'
  import { sanitizeFormInput, slugify, upperFirst } from '../utils/string'

  export let person: Pick<Person, 'body' | 'picture' | 'name'> & { id?: string }

  const { traits, topics } = getAppContext()
  $: personTraits = $traits.filter((t) => t.targetKind === 'person' && t.targetId === person?.id)
  $: isNew = !person.id

  let slug = ''
</script>

{#if isNew}
  <label>
    <span>Name</span>
    <input
      type="text"
      class="textarea"
      name="name"
      value={person.name ?? ''}
      on:input={(e) => {
        e.currentTarget.value = upperFirst(e.currentTarget.value)
        slug = slugify(e.currentTarget.value)
      }}
      on:change={(e) => {
        e.currentTarget.value = sanitizeFormInput(e.currentTarget.value)
      }}
    />
    <div class="ml-3 text-sm opacity-50 mt-1">
      {#if slug}{paths.persons(slug)}{/if}
      <input type="hidden" name="slug" bind:value={slug} />
    </div>
  </label>
{/if}

<label>
  <span>Picture url</span>
  <input type="text" class="textarea" name="picture" value={person.picture ?? ''} />
</label>

<label>
  <span>Description</span>
  <textarea class="textarea" name="body">{person.body ?? ''}</textarea>
</label>

{#if personTraits.length}
  <section class="space-y-2">
    {#each personTraits as trait}
      {@const topic = $topics.find((t) => trait.topicId === t.id)}

      <div class="flex items-baseline justify-between">
        <a class="clickable" href={paths.topics(topic?.name)}>{topic?.name}</a>
        <div class="flex gap-4 text-sm opacity-75">
          {#each Object.entries(trait.levels) as [kind, value]}
            <span>{kind}:</span>
            <span>
              <input
                type="text"
                name="traits.{trait.id}.levels.{kind}"
                {value}
                class="textarea p-0 w-6 text-sm text-center"
              />
            </span>
          {/each}
        </div>
      </div>

      <!-- prettier-ignore -->
      <textarea class="textarea" name="traits.{trait.id}.text">{trait.text ?? ''}</textarea>
    {/each}
  </section>
{/if}
