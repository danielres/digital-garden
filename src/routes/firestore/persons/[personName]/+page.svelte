<script lang="ts">
  import { page } from '$app/stores'
  import { getAppContext, type Person } from '../../appContext'
  import FormEditableDoc from '../../components/FormEditableDoc.svelte'
  import Markdown from '../../components/Markdown.svelte'

  const { persons } = getAppContext()

  $: personName = $page.params.personName
  $: person = $persons.find((p) => p.name === personName)

  const handleUpdate = (values: Partial<Person>) => {
    if (!person) return
    persons.update(person.id, values)
  }
</script>

{#if person}
  {#key person}
    <FormEditableDoc {handleUpdate}>
      <div slot="title">{person.name}</div>

      <div slot="fields">
        <label>
          <span>Description</span>
          <textarea class="textarea" name="body">{person.body ?? ''}</textarea>
        </label>
      </div>

      <div slot="content">
        {#if person.body}
          <Markdown text={person.body} />
        {:else}
          <div class="text-sm opacity-50">No description provided</div>
        {/if}
      </div>

      <div slot="buttonText">Update person</div>
    </FormEditableDoc>
  {/key}
{:else}
  <div>
    Person {personName} not found.
  </div>
{/if}
