const mongoose = require('mongoose')
const config = require('config')

mongoose.connect(config.DBHost, (err) => {
    if(err) console.log(err)
    else console.log("Database connected")
})

module.exports = mongoose.connection