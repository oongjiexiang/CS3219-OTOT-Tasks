process.env.NODE_ENV = "test";

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const Student = require('../models/class')

const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_PARTIAL_CONTENT = 206;
const STATUS_CODE_NOT_FOUND = 404;

chai.should()
chai.use(chaiHttp)

describe("Student API", () => {
    beforeEach((done) => {
        Student.deleteMany((err) => {
            done();
        })
    })
    describe("POST /student/", () => {
        it("It should POST a student's info", (done) => {
            let student = new Student({
                name: "Oong Jie Xiang",
                username: "oongjiexiang",
                age: "20"
            });
            chai.request(server)
                .post('/student')
                .send(student)
                .end((err, res) => {
                    res.should.have.status(STATUS_CODE_OK);
                    res.body.should.have.property('message');
                    res.body.message.should.eql("Student added to class");
                    done();
                })
        });
        it("It should NOT POST a student's info without age", (done) => {
            let student = new Student({
                name: "Oong Jie Xiang",
                username: "oongjiexiang"
            });
            chai.request(server)
                .post('/student')
                .send(student)
                .end((err, res) => {
                    res.should.have.status(STATUS_CODE_BAD_REQUEST);
                    res.body.should.have.property('message');
                    res.body.message.should.eql("Student not created. Ensure that age is an integer, and name and username are supplied");
                    done();
                })
        })
    });
    
})