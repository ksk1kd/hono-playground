import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/hello', (c) => {
  return c.text('Hello')
})

const blog = new Hono().basePath('/blog')

blog.get('/', (c) => {
  const id = c.req.param('id')
  return c.text('Blog List')
})

blog.get('/:id', (c) => {
  const id = c.req.param('id')
  return c.text(`Blog ${id}`)
})

app.route('/', blog)

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  },
)
