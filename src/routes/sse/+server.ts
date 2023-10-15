import type { RequestHandler } from '@sveltejs/kit'

export type Message = { content: string }

const messages: Message[] = [{ content: 'one' }]
let controllers: ReadableStreamDefaultController[] = [] // Array to keep all connected client controllers

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      messages.forEach((data) => controller.enqueue(`data: ${JSON.stringify(data)}\n\n`)) // Enqueue existing messages
      controllers.push(controller)
    },
    cancel() {
      controllers = controllers.filter((c) => c !== this) // Remove this controller from our list
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
  })
}

export const POST: RequestHandler = async ({ request }) => {
  const content = await request.json()
  messages.push(content)

  // Send the new message to all connected clients
  controllers.forEach((controller) => controller.enqueue(`data: ${JSON.stringify(content)}\n\n`))

  return new Response()
}
