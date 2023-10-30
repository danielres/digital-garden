<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton'
  import { getAppContext } from '../appContext'
  import { paths } from '../utils/navigation'

  const { traits, persons, topics } = getAppContext()
</script>

<div class="grid grid-cols-2 gap-8">
  <div class="">
    {#each $traits as trait, i}
      {#if i > 0}<hr />{/if}

      <div class="py-4 stack">
        <div class="flex gap-8 items-center">
          {#if trait.targetKind === 'person'}
            {@const person = $persons.find((p) => p.id === trait.targetId)}
            {@const topic = $topics.find((t) => t.id === trait.topicId)}

            {#if person && topic}
              <Avatar src={person.picture} width="w-8" />
              <div>
                <a href={paths.traits(trait.id)} class="clickable">
                  {person.name}
                  -
                  {topic.name}
                </a>
              </div>
              <div>{trait.kind}: {trait.scale}</div>
            {/if}
          {/if}
        </div>

        <div class="justify-self-end self-center">
          <button type="button" on:click={() => traits.del(trait.id)}>delete</button>
        </div>
      </div>
    {/each}
  </div>

  <div class="variant-ghost p-4">
    <slot />
  </div>
</div>
