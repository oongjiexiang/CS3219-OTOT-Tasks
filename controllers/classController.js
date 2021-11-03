const Student = require('../models/class')

const get_students = (req, res) => {
    Student.find({})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({"message": "Server encountered an error. Try again later"})
        })
}
const get_student = (req, res) => {
    const id = req.params.id;
    Student.findById(id)
        .then(result => {
            if(result) res.status(200).json(result)
            else res.status(404).json({message: `No student with id ${id}`})
        })
        .catch(err => {
            res.status(404).json({"message": "Not found"})
        })
}
const create_student = (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    let username = req.body.username;
    try{
        const student = new Student({
            name: name, age: age, username: username
        })
        student.save()
            .then(result => {
                res.status(200).json({"message": "Student added to class"})
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({"message": "Student not created. Ensure that age is an integer, and name and username are supplied"})
            })
    }
    catch(err){
        res.status(500).json({message: "Server error occurred. Try again later"})
    }
}
const update_student = (req, res) => {
    const id = req.params.id;
    try{
        Student.findById(id)
        .then(doc => {
            Object.assign(doc, {name: req.body.name, username: req.body.username, age: req.body.age}).save()
                .then(doc => {
                    res.status(200).json({message: "Successfully updated"})
                })
                .catch(err => {
                    res.status(500).json({message: "Fail to update"})
                })
        })
        .catch(err => {
            res.status(404).json({message: `No such student id ${id}`})
        })
    }
    catch(err){
        res.status(400).json({message: "Bad user input. Must have name, username and age (integer"})
    }
    
}
const delete_student = (req, res) => {
    const id = req.params.id;
    Student.findByIdAndDelete(id)
        .then(doc => {
            res.status(200).json({message: "Successfully deleted"})
        })
        .catch(err => {
            res.status(500).json({message: "Error deleting"})
        })
}
module.exports = {
    get_student, get_students, create_student, update_student, delete_student
};