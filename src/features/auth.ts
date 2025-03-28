import { Hono } from 'hono'

const app = new Hono().basePath('/auth')

app.get('/sample', (c) => {
  return c.text('Authenticated')
})

export default app
