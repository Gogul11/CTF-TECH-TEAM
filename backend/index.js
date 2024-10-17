const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


require('dotenv').config()


const login = require('./routers/login.js')
const user = require('./routers/user.js')
const profile = require('./routers/profile.js')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/login', login);
app.use('/signup', user)
app.use('/profiles', profile)


app.get("/", (req, res) => {
    res.status(200).json({success : true})
})

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(5000, () => {
        console.log("success")
    })
})
.catch((err) => {
    console.log(err.message)
})