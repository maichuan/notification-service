import express from 'express'
import { updateRanking } from './cron'

const app = express()

updateRanking()

app.listen(7777)

console.log('Server on port: ', 7777)
