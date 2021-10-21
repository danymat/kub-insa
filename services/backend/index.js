const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const redis = require('redis')

const client = redis.createClient({
  socket: {host:'172.18.0.2'}
})
console.log(client)

client.on('error', (err) => {
  console.log("Error connecting to database", err)
  //process.exit(1)
})

client.connect().then(() => {
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  
  app.get('/messages', async (req, res) => {
    await client.hSet('messages', '1', 'Bonjour')
    await client.hSet('messages', '2', 'Bonjour')
    await client.hSet('messages', '3', 'Bonjour')
    let messages = await client.hGetAll('messages')
    res.send(messages)
  })
})




