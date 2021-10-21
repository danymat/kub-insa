const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const redis = require('redis')
app.use(cors())

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

const client = redis.createClient({
  socket: {host:'172.18.0.2'}
})

client.on('error', (err) => {
  console.log("Error connecting to database", err)
  //process.exit(1)
})

client.connect().then(() => {
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.post('/messages', async (req, res) => {
    console.log(req)
    console.log(req.body)
    let message = req.body.message
    await client.hSet('messages', '10', message)
    res.send("Message dans la DB")
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




