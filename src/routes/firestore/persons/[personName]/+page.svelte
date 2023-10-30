<script lang="ts">
  import { page } from '$app/stores'
  import { Avatar } from '@skeletonlabs/skeleton'
  import { groupByKey } from '../../../tagtree2/utils/object'
  import { getAppContext, type Person } from '../../appContext'
  import FormEditableDoc from '../../components/FormEditableDoc.svelte'
  import Markdown from '../../components/Markdown.svelte'
  import { paths } from '../../utils/navigation'
  import { upperFirst } from '../../utils/string'

  const { persons, traits, topics } = getAppContext()

  $: personName = $page.params.personName
  $: person = $persons.find((p) => p.name === personName)
  $: personTraits = groupByKey(
    $traits.filter((t) => t.targetKind === 'person' && t.targetId === person?.id),
    'kind'
  )

  const handleUpdate = (values: Partial<Person>) => {
    if (!person) return
    persons.update(person.id, values)
  }
</script>

{#if person}
  {#key person}
    <FormEditableDoc {handleUpdate}>
      <div slot="title" class="flex items-center gap-2">
        <Avatar src={person.picture} width="w-12" initials={person.name} />
        {person.name}
      </div>

      <div slot="fields">
        <label>
          <span>Description</span>
          <textarea class="textarea" name="body">{person.body ?? ''}</textarea>
        </label>
      </div>

      <div slot="content" class="grid gap-4">
        {#if person.body}
          <Markdown text={person.body} />
        {:else}
          <div class="text-sm opacity-50">No description provided</div>
        {/if}

        {#each Object.entries(personTraits) as [kind, traits]}
          <div>
            <h3>{upperFirst(kind)}</h3>

            <ul class="grid gap-1">
              {#each traits as trait, i}
                {@const topic = $topics.find((t) => trait.topicId === t.id)}

                {#if topic}
                  <li class="px-4 py-2 variant-soft rounded-md">
                    <a class="clickable" href={paths.topics(topic.name)}>{topic.name}</a>
                    : {trait.scale}

                    <div>
                      <Markdown text={trait.text} />
                    </div>
                  </li>
                {/if}
              {/each}
            </ul>
          </div>
        {/each}
      </div>

      <div slot="buttonText">Update person</div>
    </FormEditableDoc>
  {/key}
{:else}
  <div>
    Person {personName} not found.
  </div>
{/if}
