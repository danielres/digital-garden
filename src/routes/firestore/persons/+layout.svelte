<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton'
  import { getAppContext } from '../appContext'
  import { paths } from '../utils/navigation'

  const { persons } = getAppContext()
  type FormOnSubmitEvent = Event & { currentTarget: EventTarget & HTMLFormElement }
  type FormOnSubmit = (e: FormOnSubmitEvent) => void

  const onSubmitPerson: FormOnSubmit = (e) => {
    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    const { name, body } = Object.fromEntries(formData) as Record<string, string>
    persons.add({ name, body })
    formEl.reset()
  }
</script>

<div class="grid grid-cols-2 gap-8">
  <div class="">
    {#each $persons as person, i}
      {#if i > 0}
        <hr />
      {/if}
      <div class="py-4">
        <a class="clickable flex gap-4 items-center" href={paths.persons(person.name)}>
          <Avatar width="w-8" src={person.picture} initials={person.name} />
          {person.name}
        </a>
      </div>
    {/each}
  </div>

  <div class="variant-ghost p-4">
    <slot />
  </div>
</div>
