import axios from 'axios'

const host = process.env.HOST || 'http://0.0.0.0:3000'

export const serverClient = axios.create({
  baseURL: host,
})
