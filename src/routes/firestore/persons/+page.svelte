<script lang="ts">
  import { Timestamp } from 'firebase/firestore'
  import Resource from '../components/Resource.svelte'
  import { getAppContext } from '../appContext'

  const { persons } = getAppContext()

  function makeNewResource() {
    return {
      resourceType: 'person',
      id: crypto.randomUUID(),
      createdAt: new Timestamp(Date.now() / 1000, 0),
      text: '',
      label: '',
      slug: '',
      picture: `https://i.pravatar.cc/150?img=${randomBetween(1, 70)}`,
    } as const
  }

  let resource = makeNewResource()

  function randomBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
</script>

<Resource
  {resource}
  isNew={true}
  isEditing={true}
  on:submit={({ detail }) => {
    persons.add(detail)
    resource = makeNewResource()
  }}
/>
