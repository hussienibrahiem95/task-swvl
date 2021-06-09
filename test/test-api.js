const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app')




chai.use(chaiHttp);

chai.should();


describe('Test Notfications API ',()=>{

    let token_api ='';
    // test  end point GET token 
    describe("GET /notifications/getToken" , ()=>{
        it("it should Get notification token " , (done) =>{
            chai.request(server)
                .get("/notifications/getToken")
                .end((err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('token');
                    token_api = response.body.token;
                    done();

                })
        })
    })

    // Test send sms message

    describe("POST /notifications/sendSms" , ()=>{
        it("it should send message and return SMS Sent " , (done) =>{
            let data = {
                "message" : "hello",
                "clients" :[{
                    "number" :"+201090103896",
                    "language":"en" }
                ]
            };
            // first get token 
            chai.request(server)
                .post("/notifications/sendSms")
                .set('Authorization', token_api)
                .send(data)
                .end((err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status');
                    response.body.should.have.property('status').eql('SMS Sent');
                    done();

                })
        })
    })

    describe("POST /notifications/sendSms" , ()=>{
        it("it should not send message and return error that no clients pass " , (done) =>{
            
            let data = {
                "message" : "hello"
            };
            // first get token 
            chai.request(server)
                .post("/notifications/sendSms")
                .set('Authorization', token_api)
                .send(data)
                .end((err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('error');
                    response.body.should.have.property('error').eql('no clients');
                    done();

                })
        })
    })

    describe("POST /notifications/sendSms" , ()=>{
        it("it should not send message and clien should have number " , (done) =>{
            
            let data = {
                "message" : "hello",
                "clients" :[
                    {"language":"en" }
                ]
            };
            // first get token 
            chai.request(server)
                .post("/notifications/sendSms")
                .set('Authorization', token_api)
                .send(data)
                .end((err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('error');
                    response.body.should.have.property('error').eql('every client should have number');
                    done();

                })
        })
    })


})

