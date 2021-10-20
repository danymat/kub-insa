const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.get('/msg', (req, res) => {
  res.status(200).send({
    list_messages: [
      {
          timestamp: "aaaaaaa",
          message: "mon_message"
      },
      {
           timestamp: "aaaaaaa",
          message: "mon_message"
      }
    ]
  })
})

app.post('/msg', (req, res) => {
  res.status(200).send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})