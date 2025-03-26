import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
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

app.get('/403', (c) => {
  throw new HTTPException(403, { message: 'Permission Denied' })
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
