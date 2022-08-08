const chai= require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const server =require('../routes/apiRoutes');

chai.should();

chai.use(chaiHttp);

describe('YouTube Api', () => {


    describe("GET /search", ()=>{
        it("It should get all the data",(done)=>{
            chai.request(server)
                .get("/search")
                .end((err,response)=>{
                    response.should.have.status(200);
                done();
                })
        })
    })

    describe("GET /search", ()=>{
        it("It should return the data type as array",(done)=>{
            chai.request(server)
                .get("/search")
                .end((err,response)=>{
                    response.body.should.be.a('array');
                done();
                })
        })

        describe("GET /search", ()=>{
            it("It return the size of array 5",(done)=>{
                chai.request(server)
                    .get("/search")
                    .end((err,response)=>{
                        response.body.length.should.be.eq(5);
                    done();
                    })
            })
        })

        describe("GET /mostpopular", ()=>{
            it("It should get all the mmost popular videos",(done)=>{
                chai.request(server)
                    .get("/mostpopular")
                    .end((err,response)=>{
                        response.should.have.status(200);
                    done();
                    })
            })
        })

        describe("GET /mostpopular", ()=>{
            it("It should get all the mmost popular videos in the form of array",(done)=>{
                chai.request(server)
                    .get("/mostpopular")
                    .end((err,response)=>{
                        response.body.should.be.a('array');
                    done();
                    })
            })
        })

        describe("GET /mostpopular", ()=>{
            it("The length of the array must be 10",(done)=>{
                chai.request(server)
                    .get("/mostpopular")
                    .end((err,response)=>{
                        response.body.length.should.be.eq(10);
                    done();
                    })
            })
        })



    })




})
