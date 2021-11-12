process.env.NODE_ENV = "test";

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const Job = require('../models/job')

const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_NOT_FOUND = 404;

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
                salary: "10",
                jobType: "Research",
                contact: "Ms. Fiona Lim at fiona@yahoo.com"
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
                salary: "10",
                jobType: "Research",
                contact: "Ms. Fiona Lim at fiona@yahoo.com"
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
        it("It should POST a job without salary when salary is not a Number", (done) => {
            let job = new Job({
                title: "Research Assistant",
                description: "Prepare documents and research findings for the landscape of maritime environment in Singapore. Must possess good Excel skills",
                salary: "a",
                jobType: "Research",
                contact: "Ms. Fiona Lim at fiona@yahoo.com"
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
        })
    });
    
    describe("GET /job/", () => {
        it("It should GET a job's info", (done) => {
            let job = new Job({
                title: "Research Assistant",
                description: "Prepare documents and research findings for the landscape of maritime environment in Singapore. Must possess good Excel skills",
                salary: "10",
                jobType: "Research",
                contact: "Ms. Fiona Lim at fiona@yahoo.com"
            });
            job.save((err, doc) => {
                const job_id = doc._id;
                chai.request(server)
                .get('/job/' + job_id)
                .end((err, res) => {
                    res.should.have.status(STATUS_CODE_OK);
                    res.body.should.have.property('result');
                    res.body.result.should.have.property('title');
                    res.body.result.should.have.property('description');
                    res.body.result.should.have.property('salary');
                    res.body.result.should.have.property('jobType');
                    res.body.result.should.have.property('contact');
                    res.body.result.title.should.eql(job.title);
                    res.body.result.description.should.eql(job.description);
                    res.body.result.salary.should.eql(job.salary);
                    res.body.result.jobType.should.eql(job.jobType);
                    res.body.result.contact.should.eql(job.contact);
                    done();
                })
            })
        });
        it("It should Not GET a job's info", (done) => {
            let job = new Job({
                title: "Research Assistant",
                description: "Prepare documents and research findings for the landscape of maritime environment in Singapore. Must possess good Excel skills",
                salary: "10",
                jobType: "Research",
                contact: "Ms. Fiona Lim at fiona@yahoo.com"
            });
            job.save((err, doc) => {
                chai.request(server)
                .get('/job/' + '123')
                .end((err, res) => {
                    res.should.have.status(STATUS_CODE_NOT_FOUND);
                    res.body.should.have.property('message');
                    res.body.message.should.eql('Not found');
                    done();
                })
            })
        });
    });
    describe("UPDATE /job/", () => {
        it("It should UPDATE a job's info when the ID specified is correct", (done) => {
            let job = new Job({
                title: "Research Assistant",
                description: "Prepare documents and research findings for the landscape of maritime environment in Singapore. Must possess good Excel skills",
                salary: "10",
                jobType: "Research",
                contact: "Ms. Fiona Lim at fiona@yahoo.com"
            });
            let updatedJob = new Job({
                title: "Tutor",
                description: "Prepare documents",
                salary: "12",
                jobType: "Tutor",
                contact: "NA"
            });

            job.save((err, doc) => {
                const job_id = doc._id;
                chai.request(server)
                .put('/job/' + job_id)
                .send(updatedJob)
                .end((err, res) => {
                    res.should.have.status(STATUS_CODE_OK);
                    res.body.should.have.property('message');
                    res.body.message.should.eql('Successfully updated')
                    done();
                })
            })
        });
        it("It should NOT UPDATE a job when the ID specified does not exist", (done) => {
            let job = new Job({
                title: "Research Assistant",
                description: "Prepare documents and research findings for the landscape of maritime environment in Singapore. Must possess good Excel skills",
                salary: "10",
                jobType: "Research",
                contact: "Ms. Fiona Lim at fiona@yahoo.com"
            });
            let updatedJob = new Job({
                title: "Tutor",
                description: "Prepare documents",
                salary: "12",
                jobType: "Tutor",
                contact: "NA"
            });

            job.save((err, doc) => {
                const job_id = doc._id;
                chai.request(server)
                .put('/job/' + '123')
                .send(updatedJob)
                .end((err, res) => {
                    res.should.have.status(STATUS_CODE_NOT_FOUND);
                    res.body.should.have.property('message');
                    res.body.message.should.eql(`No such job id 123`)
                    done();
                })
            })
        });
        it("It should UPDATE a job without salary when salary is not an integer", (done) => {
            let job = new Job({
                title: "Research Assistant",
                description: "Prepare documents and research findings for the landscape of maritime environment in Singapore. Must possess good Excel skills",
                salary: "10",
                jobType: "Research",
                contact: "Ms. Fiona Lim at fiona@yahoo.com"
            });
            let updatedJob = new Job({
                title: "Tutor",
                description: "Prepare documents",
                salary: "a",
                jobType: "Tutor",
                contact: "NA"
            });

            job.save((err, doc) => {
                const job_id = doc._id;
                chai.request(server)
                .put('/job/' + job_id)
                .send(updatedJob)
                .end((err, res) => {
                    res.should.have.status(STATUS_CODE_OK);
                    res.body.should.have.property('message');
                    res.body.message.should.eql('Successfully updated');
                    done();
                })
            })
        });
    });
    describe('DELETE /job/:id', () => {
        it('It should DELETE a job when the database is online', (done) => {
            let job = new Job({
                title: "Research Assistant",
                description: "Prepare documents and research findings for the landscape of maritime environment in Singapore. Must possess good Excel skills",
                salary: "10",
                jobType: "Research",
                contact: "Ms. Fiona Lim at fiona@yahoo.com"
            });
            job.save((err, doc) => {
                chai.request(server)
                .delete(`/job/${doc._id}`)
                .end((err, res) => {
                    res.should.have.status(STATUS_CODE_OK)
                    res.body.should.have.property('message');
                    res.body.message.should.eql('Successfully deleted')
                    done();
                })
            })
        });
        it('It should NOT DELETE a job when there is no such ID', (done) => {
            chai.request(server)
            .delete('/job/no-such-id')
            .end((err, res) => {
                res.should.have.status(STATUS_CODE_BAD_REQUEST)
                res.body.should.have.property('message');
                res.body.message.should.eql('No such job')
                done();
            })
        })
    })
})