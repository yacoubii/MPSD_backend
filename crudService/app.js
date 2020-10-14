const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/Blog'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('Connected...')
})


app.use(express.json())

const postRouter = require('./routes/posts')
app.use('/posts',postRouter)

app.listen(9000, () => {
    console.log('Server started')
})