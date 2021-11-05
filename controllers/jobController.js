const Job = require('../models/job')

const get_jobs = (req, res) => {
    Job.find({})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({"message": "Server encountered an error. Try again later"})
        })
}
const get_job = (req, res) => {
    const id = req.params.id;
    Job.findById(id)
        .then(result => {
            if(result) res.status(200).json({result})
            else res.status(404).json({message: `No job with id ${id}`})
        })
        .catch(err => {
            res.status(404).json({"message": "Not found"})
        })
}
const create_job = (req, res) => {
    let title = req.body.title;
    let salary = req.body.salary;
    let description = req.body.description;
    try{
        const job = new Job({
            title: title, salary: salary, description: description
        })
        job.save()
            .then(result => {
                res.status(200).json({"message": "Job added"})
            })
            .catch(err => {
                res.status(400).json({"message": "Job not created. Ensure that salary is an integer, and title is supplied"})
            })
    }
    catch(err){
        res.status(500).json({message: "Server error occurred. Try again later"})
    }
}
const update_job = (req, res) => {
    const id = req.params.id;
    try{
        Job.findById(id)
        .then(doc => {
            Object.assign(doc, {title: req.body.title, description: req.body.description, salary: req.body.salary}).save()
                .then(doc => {
                    res.status(200).json({message: "Successfully updated"})
                })
                .catch(err => {
                    res.status(500).json({message: "Fail to update"})
                })
        })
        .catch(err => {
            res.status(404).json({message: `No such job id ${id}`})
        })
    }
    catch(err){
        res.status(400).json({message: "Bad user input. Must have title, description and salary (integer)"})
    }
    
}
const delete_job = (req, res) => {
    const id = req.params.id;
    Job.findByIdAndDelete(id)
        .then(doc => {
            res.status(200).json({message: "Successfully deleted"})
        })
        .catch(err => {
            res.status(500).json({message: "Error deleting"})
        })
}
module.exports = {
    get_job, get_jobs, create_job, update_job, delete_job
};