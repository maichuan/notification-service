import express, { Request, Response } from 'express'
import morgan from 'morgan'
import { PushToken, handlePushOnOrderComplete } from './notification'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Push Notification Server Running')
})

app.post('/', async (req: Request, res: Response) => {
  const { token, name, title } = req.body

  const notification: PushToken = {
    title,
    body: `${name} is completed`,
    token,
  }
  const status = await handlePushOnOrderComplete(notification)

  if (status) {
    return res.status(200).send({ message: 'Completed' })
  } else {
    return res.status(501).send({ message: 'Failed' })
  }
})

app.listen(2541, () => console.log('Server on port:', 2541))
