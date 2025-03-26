import { Hono } from 'hono'

const app = new Hono().basePath('/blog')

app.get('/', (c) => {
  const id = c.req.param('id')
  return c.json([{ title: 'Blog 1' }, { title: 'Blog 2' }, { title: 'Blog 3' }])
})

app.get('/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ title: `Blog ${id}` })
})

export default app
