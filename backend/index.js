const connectToMongo = require('./db.js')
const express = require('express')
const app = express()
const port = 3000



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/auth', require('./routes/auth.js'))

connectToMongo();
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})