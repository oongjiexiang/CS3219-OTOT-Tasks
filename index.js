const express = require('express')
const config = require('config')
const cors = require('cors')
const db = require('./db/index')
const app = express()
const port = process.env.PORT || 3000;

const classRouter = require('./routes/classRoutes')
const jobRouter = require('./routes/jobRoutes')

// add middleware
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

// add routes
app.use('/student', classRouter)
app.use('/job', jobRouter)
app.listen(port, () => {
    console.log(`Listening at ${port}`)
})

// check database
db.on("error", console.error.bind(console, "MongoDB connection error"));

module.exports = app