const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001
const cors = require('cors')
const db = require('./queries')


app.use(cors({
    origin: '*',
    credentials: true}))
app.options('*', cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



app.get('/', (request, response) => {
	  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/data', db.getAllData)
app.get('/data/:medium', db.getAllDataCat)
app.post('/data', db.createEntry)
app.put('/data/:id', db.updateEntry)
app.delete('/data/:id', db.deleteEntry)

app.listen(port, () => {
	  console.log(`App running on port ${port}.`)
})

module.exports = app;
