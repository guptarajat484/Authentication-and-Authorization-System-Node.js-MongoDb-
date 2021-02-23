const express = require('express')
const bodyParser = require('body-parser')
const signupRoute = require('./routes/signup')
const loginRoute = require('./routes/login')
const user = require('./routes/user')
const path = require('path')
const app = express()



app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use('/signup', signupRoute)
app.use('/login', loginRoute)
app.use('/user', user)

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(8989, () => {
    console.log("Server is running on port 8989")
})