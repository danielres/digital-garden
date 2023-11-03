<script lang="ts">
  import { page } from '$app/stores'
  import { getAppContext } from '../../appContext'
  import FormEditableDoc from '../../components/FormEditableDoc.svelte'
  import Markdown from '../../components/Markdown.svelte'
  import TraitItem from '../../components/TraitItem.svelte'
  import { nestedify } from '../../utils/forms'
  import FormFields from '../FormFields.svelte'
  import PersonHead from './PersonHead.svelte'

  const { persons, traits } = getAppContext()

  $: slug = $page.params.slug
  $: person = $persons.find((p) => p.slug === slug)
  $: personTraits = $traits.filter((t) => t.targetId === person?.id)

  const handleUpdate = (values: Record<string, string>) => {
    if (!person) return
    const { traits: traitsValues, ...personValues } = nestedify(values)
    persons.update(person.id, personValues)
    if (traitsValues)
      Object.entries(traitsValues).forEach(([id, values]) => traits.update(id, values))
  }
</script>

{#if person}
  <FormEditableDoc {handleUpdate}>
    <svelte:fragment slot="title">
      <PersonHead {person} />
    </svelte:fragment>

    <svelte:fragment slot="content">
      <Markdown text={person.body} />

      {#each personTraits as trait}
        <TraitItem {trait} from="target" />
      {/each}
    </svelte:fragment>

    <svelte:fragment slot="fields">
      <FormFields {person} />
    </svelte:fragment>

    <svelte:fragment slot="buttonText">Update person</svelte:fragment>
  </FormEditableDoc>
{:else}
  <div>
    Person "{slug}" not found.
  </div>
{/if}
