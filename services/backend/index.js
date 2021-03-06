const express = require('express')
const cors = require('cors')
const redis = require('redis')
const amqp = require('amqplib/callback_api')

const app = express()
const port = process.env.PORT || 3000
app.use(cors())
var queue = 'logs';

app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

const client = redis.createClient({
    socket: { host: 'redis-service' }
})

function api(channel) {
    client.on('error', (err) => {
        console.log("Error connecting to database", err)
        process.exit(1)
    })

    client.connect().then(() => {
        app.get('/', (req, res) => {
            res.send('Hello World!')
        })

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })

        app.post('/messages', async (req, res) => {
            let message = req.body.message
            await client.hSet('messages', 'key', message)
            channel.sendToQueue(queue, Buffer.from("new_message"))
            console.log("msg: "+message)
            res.send("Message dans la DB")
        })


        app.get('/messages', async (_, res) => {
            let messages = await client.hGetAll('messages')
            channel.sendToQueue(queue, Buffer.from("get_messages"))
            console.log("get_msg: ")
            res.send(messages)
        })
    })
}


amqp.connect('amqp://rabbitmq-service', (err, connexion) => {
    if (err) {
        console.log("Error connecting to rabbitmq", err)
        process.exit(1)
    }
    console.log("connected to rabbitmq")
    connexion.createChannel((err, ch) => {
        if (err) {
            console.log("Error connecting to rabbitmq channel", err)
            process.exit(1)
        }

        ch.assertQueue(queue, {
            durable: true
        });
        
        api(ch)

    })
})

