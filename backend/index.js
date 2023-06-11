const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 8000

// this is used for sending object in request
app.use(express.json())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'))

connectToMongo();
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})