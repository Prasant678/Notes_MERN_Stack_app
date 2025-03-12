const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const ConnectToMongo = require('./db')

ConnectToMongo();
// app.get('/', (req, res) => {
//   res.send('Hello Prasant!')
// })
app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})