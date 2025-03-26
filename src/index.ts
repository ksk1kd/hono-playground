import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/hello', (c) => {
  return c.text('Hello')
})

app.get('/redirect', (c) => {
  return c.redirect('/')
})

const blog = new Hono().basePath('/blog')

blog.get('/', (c) => {
  const id = c.req.param('id')
  return c.json([{ title: 'Blog 1' }, { title: 'Blog 2' }, { title: 'Blog 3' }])
})

blog.get('/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ title: `Blog ${id}` })
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
