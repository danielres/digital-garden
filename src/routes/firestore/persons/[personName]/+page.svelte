<script lang="ts">
  import { page } from '$app/stores'
  import { getAppContext } from '../../appContext'
  import FormEditableDoc from '../../components/FormEditableDoc.svelte'
  import Markdown from '../../components/Markdown.svelte'
  import TraitItem from '../../components/TraitItem.svelte'
  import TraitLevels from '../../components/TraitLevels.svelte'
  import { nestedify } from '../../utils/forms'
  import { paths } from '../../utils/navigation'
  import FormFields from '../FormFields.svelte'
  import PersonHead from './PersonHead.svelte'

  const { persons, traits, topics } = getAppContext()

  $: personName = $page.params.personName
  $: person = $persons.find((p) => p.name === personName)
  $: personTraits = $traits.filter((t) => t.targetKind === 'person' && t.targetId === person?.id)

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
    Person "{personName}" not found.
  </div>
{/if}
