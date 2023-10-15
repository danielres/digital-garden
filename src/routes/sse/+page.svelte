<script lang="ts">
  import { onMount } from 'svelte'
  import type { Message } from './+server'

  let messages: Message[] = []
  let newMessage = ''

  onMount(() => {
    const eventSource = new EventSource('/sse')

    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data)
      messages = [...messages, message]
    }
  })

  async function sendMessage() {
    await fetch('/sse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newMessage }),
    })
    newMessage = ''
  }
</script>

<div class="max-w-2xl mx-auto my-8 space-y-8">
  <div class="variant-soft rounded p-4 text-sm space-y-4">
    <p>
      This demonstrates how to use SSE (server-side-events) + the Stream API as an alternative to
      websockets or similar. This approach is simpler and suitable for smaller projects.
    </p>
    <p>Open in 2 different browser windows to see the realtime updates.</p>
  </div>

  <div class="grid grid-cols-2 gap-8">
    <div class="">
      <h2>New message</h2>
      <textarea class="textarea rounded" bind:value={newMessage} />
      <button class="btn variant-ghost mt-4 rounded" on:click|preventDefault={sendMessage}>
        Send message
      </button>
    </div>

    <div>
      <h2>Messages</h2>
      <div class="border p-4 rounded">
        <ul class="list-disc ml-8">
          {#each messages as message (message.content)}
            <li>{message.content}</li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>
