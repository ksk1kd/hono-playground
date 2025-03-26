import { Hono } from 'hono'

const app = new Hono().basePath('/blog')

app.get('/', (c) => {
  const blogs = [{ title: 'Blog 1' }, { title: 'Blog 2' }, { title: 'Blog 3' }]

  const { q } = c.req.query()
  if (q) {
    return c.json(blogs.filter((blog) => blog.title.includes(q)))
  }

  return c.json(blogs)
})

app.get('/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ title: `Blog ${id}` })
})

export default app
