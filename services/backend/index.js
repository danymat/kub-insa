const express = require('express')
const cors = require('cors')
const redis = require('redis')

const app = express()
const port = process.env.PORT || 3000
app.use(cors())

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

const client = redis.createClient({
    socket: { host: 'services-database-1' }
})

client.on('error', (err) => {
    console.log("Error connecting to database", err)
    process.exit(1)
})

client.connect().then(() => {
    app.get('/', (_, res) => {
        res.send('Hello World!')
    })

    app.post('/messages', async (req, res) => {
        console.log(req.body)
        let message = req.body.message
        await client.hSet('messages', 'key', message)
        res.send("Message dans la DB")
    })

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })

    app.get('/messages', async (_, res) => {
        let messages = await client.hGetAll('messages')
        res.send(messages)
    })
})




