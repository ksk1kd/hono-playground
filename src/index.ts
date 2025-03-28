import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { HTTPException } from 'hono/http-exception'
import auth from './features/auth.ts'
import blog from './features/blog.ts'

const app = new Hono()

app.use(
  '/auth/*',
  basicAuth({
    username: 'hono',
    password: 'password',
  }),
)

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
app.route('/', auth)

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  },
)
