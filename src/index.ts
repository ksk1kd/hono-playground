import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import blog from './features/blog.ts'

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
