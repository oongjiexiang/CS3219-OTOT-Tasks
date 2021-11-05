process.env.NODE_ENV = "test";

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const Job = require('../models/job')

const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 400;

chai.should()
chai.use(chaiHttp)

describe("Job API", () => {
    beforeEach((done) => {
        Job.deleteMany((err) => {
            done();
        })
    })
    describe("POST /job/", () => {
        it("It should POST a job's info", (done) => {
            let job = new Job({
                title: "Research Assistant",
                description: "Prepare documents and research findings for the landscape of maritime environment in Singapore. Must possess good Excel skills",
                salary: "10"
            });
            chai.request(server)
                .post('/job')
                .send(job)
                .end((err, res) => {
                    res.should.have.status(STATUS_CODE_OK);
                    res.body.should.have.property('message');
                    res.body.message.should.eql("Job added");
                    done();
                })
        });
        it("It should NOT POST a job's info without title", (done) => {
            let job = new Job({
                description: "Prepare documents and research findings for the landscape of maritime environment in Singapore. Must possess good Excel skills",
            });
            chai.request(server)
                .post('/job')
                .send(job)
                .end((err, res) => {
                    res.should.have.status(STATUS_CODE_BAD_REQUEST);
                    res.body.should.have.property('message');
                    res.body.message.should.eql("Job not created. Ensure that salary is an integer, and title is supplied");
                    done();
                })
        })
    });
    
})