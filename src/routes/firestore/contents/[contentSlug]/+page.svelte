<script lang="ts">
  import { page } from '$app/stores'
  import { groupByKey } from '../../../tagtree2/utils/object'
  import { getAppContext, type Content } from '../../appContext'
  import FormEditableDoc from '../../components/FormEditableDoc.svelte'
  import Markdown from '../../components/Markdown.svelte'
  import { paths } from '../../utils/navigation'
  import { truncate, upperFirst } from '../../utils/string'

  import * as Icon from '../../components/Icons'
  import { renderDate } from '../../utils/date'

  const { contents, traits, topics } = getAppContext()

  $: contentSlug = $page.params.contentSlug
  $: content = $contents.find((p) => p.slug === contentSlug)
  $: contentTraits = groupByKey(
    $traits.filter((t) => t.targetKind === 'content' && t.targetId === content?.id),
    'kind'
  )

  const handleUpdate = (values: Partial<Content>) => {
    if (!content) return
    contents.update(content.id, values)
  }
</script>

{#if content}
  {#key content}
    <FormEditableDoc {handleUpdate}>
      <div slot="title" class="">
        <div class="text-xs font-normal opacity-50">
          {renderDate(content.createdAt.toDate())}
        </div>
        <div>{content.title}</div>
        {#if content.url}
          <div
            class="text-sm font-normal underline underline-offset-4 opacity-50 hover:opacity-100"
          >
            <a href={content.url} target="_blank" class="flex gap-2 items-center">
              {truncate(content.url, 40)}
              <Icon.LinkExternal class="w-4" />
            </a>
          </div>
        {/if}
      </div>

      <div slot="fields">
        <label>
          <span>Description</span>
          <textarea class="textarea" name="text">{content.text ?? ''}</textarea>
        </label>
      </div>

      <div slot="content" class="grid gap-4">
        {#if content.text}
          <Markdown text={content.text} />
        {:else}
          <div class="text-sm opacity-50">No description provided</div>
        {/if}

        {#each Object.entries(contentTraits) as [kind, traits]}
          <div>
            <h3>{upperFirst(kind)}</h3>

            <ul class="grid gap-1">
              {#each traits as trait, i}
                {@const topic = $topics.find((t) => trait.topicId === t.id)}

                {#if topic}
                  <li class="px-4 py-2 variant-soft rounded-md">
                    <a class="clickable" href={paths.topics(topic.name)}>{topic.name}</a>
                    : {trait.scale}

                    <!--
                      <div>
                        <Markdown text={trait.text} />
                      </div>
                    -->
                  </li>
                {/if}
              {/each}
            </ul>
          </div>
        {/each}
      </div>

      <div slot="buttonText">Update content</div>
    </FormEditableDoc>
  {/key}
{:else}
  <div>
    Content {contentSlug} not found.
  </div>
{/if}
