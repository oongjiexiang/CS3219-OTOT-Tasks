const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  salary: Number,
  jobType: String,
  contact: String
})

const Job = mongoose.model('Job', jobSchema)

module.exports = Job