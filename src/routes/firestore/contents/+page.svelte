<script lang="ts">
  import { Timestamp } from 'firebase/firestore'
  import { getAppContext } from '../appContext'
  import Panel from '../components/Panel.svelte'
  import Resource from '../components/Resource.svelte'
  import validate from '../utils/validate'

  const { contents } = getAppContext()

  function makeNewResource() {
    return {
      resourceType: 'content',
      id: crypto.randomUUID(),
      createdAt: new Timestamp(Date.now() / 1000, 0),
      text: '',
      label: '',
      slug: '',
      url: '',
    } as const
  }

  let resource = makeNewResource()
</script>

<Panel isAdmin>
  <Resource
    {resource}
    isNew={true}
    on:submit={({ detail }) => {
      contents.add(detail)
      resource = makeNewResource()
    }}
    validate={validate.content}
  />
</Panel>
