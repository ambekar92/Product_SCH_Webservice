const bodyParser = require('body-parser')
const express = require('express')
const app = express();

const test = require('../controllers/test/test.js')


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', test.getUsers)
app.post('/user', test.getuser)



module.exports= app ;