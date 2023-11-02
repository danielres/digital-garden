<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton'
  import type { Person } from '../../appContext'
  import { renderDate } from '../../utils/date'

  export let person: Person
</script>

<div class="grid grid-cols-[auto_1fr] gap-4">
  <Avatar src={person.picture} width="w-12" initials={person.name} />

  <div>
    <div>{person.name}</div>

    <div class="text-sm font-normal w-full opacity-50">
      Joined: {renderDate(person.createdAt.toDate())}
    </div>
  </div>
</div>
