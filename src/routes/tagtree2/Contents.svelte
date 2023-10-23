<script lang="ts">
  import ContentTraitRating from './ContentTraitRating.svelte'
  import PersonAvatarAndName from './Persons/PersonAvatarAndName.svelte'
  import { getContentsContext } from './useContents'
  import { getPersonsContext } from './usePersons'
  import { getTreeContext } from './useTree'
  import * as Icons from './Icons'
  import { renderDate } from './utils/date'

  const { contents, contentTraits } = getContentsContext()
  const { nodes } = getTreeContext()
  const { persons } = getPersonsContext()
</script>

<ul>
  {#each $contents as content, i}
    {@const person = $persons.find((p) => p.id === content.addedBy)}
    {@const dividerClass = i === 0 ? '' : 'border-t border-surface-500/50 pt-4 mt-4'}
    <li class="grid grid-cols-[1fr_auto] {dividerClass}">
      <div class="">
        <div class="text-xs opacity-50">{renderDate(content.addedAt)}</div>
        <h3 class="leading-tight text-base">
          <div>{content.title}</div>
          <a
            target="_blank"
            class="underline underline-offset-4 text-sm font-normal flex items-center gap-1 opacity-75 hover:opacity-100"
            href={content.src}
          >
            {content.src}
            <Icons.LinkExternal class="w-4" />
          </a>
        </h3>
        <div class="text-sm mt-2">{content.description}</div>
      </div>

      <div class="grid justify-items-end gap-4">
        <ul class="grid justify-items-end place-self-start">
          {#each $contentTraits.filter((t) => t.contentId === content.id) as contentTrait}
            {@const node = $nodes.find((node) => node.id === contentTrait.nodeId)}
            <li class="flex items-center gap-2">
              <a class="clickable" href="/tagtree2/topics/{node?.id}">
                {node?.value ?? contentTrait.nodeId}
              </a>
              <ContentTraitRating {contentTrait} interactive={false} />
            </li>
          {/each}
        </ul>

        <div class="place-self-end">
          <a class="clickable" href="/tagtree2/persons/{content.addedBy}">
            <PersonAvatarAndName {person} />
          </a>
        </div>
      </div>
    </li>
  {/each}
</ul>
