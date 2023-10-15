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

<textarea class="textarea" bind:value={newMessage} />
<button on:click|preventDefault={sendMessage}>Send</button>

<ul class="border p-4">
  {#each messages as message (message.content)}
    <li>{message.content}</li>
  {/each}
</ul>
