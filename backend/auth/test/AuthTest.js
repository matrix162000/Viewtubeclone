const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server');
chai.should();
chai.use(chaiHttp);


describe('Testing For Authentication Service', () => {

    describe("1 - Register a  new User/api/auth/register", () => {
        it("Register User", (done) => {
            let user =
            {
                "firstName": "Shams",
                "lastName": "Ahmad",
                "email": "sma@gmail.com",
                "password": "123456",
                "secretQuestion":"football"
            }
            chai.request(app)
                .post("/api/auth/register")
                .send(user)
                .end( (err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eql("New User added successfully");
                    done();
                })
    
        });
        it(" 2-Registering a user with existing email id ", (done) => {
            let user =
            {
                "firstName": "Sachin",
                "lastName": "Yadav",
                "email": "sma@gmail.com",
                "password": "123456",
                "secretQuestion":"football"
            }
            chai.request(app)
                .post("/api/auth/register")
                .send(user)
                .end( (err, res) => {
                    res.should.have.status(404);
                    res.should.have.property('text').eql("User with specified email already exist");
                    done();
                })
        });
    });
    describe("POST login", () => {
        it(" 3 - Login to The website ", (done) => {
            chai.request(app)
                .post("/api/auth/login")
                .send({
                    email: 'rnm@gmail.com',
                    password: 'Vilen@006'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.keys('msg', 'userid', 'state');


                    done();
                });
        });
        it(" 4 - Login With Wrong Password Or Email", (done) => {
            chai.request(app)
                .post("/api/login")
                .send({
                    email: 'rnm@gmail.com',
                    password: 'CodeWell@006'
                })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.should.to.be.html;
                    done();
                });
        });
    });

    describe("5 - Reset Pasword", () => {
        it(" Reset Password With Right Answer And Email ", (done) => {
            chai.request(app)
                .post("/api/auth/resetPassword")
                .send({
                    email: 'sny@gmail.com',
                    secretQuestion:"cricket",
                    newPassword:"sny123456"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.should.have.property('text').eql("Password reset successfully");
                    ;


                    done();
                });
        });

        
        it(" Reset Password with Right Answer And Email ", (done) => {
            chai.request(app)
                .post("/api/auth/resetPassword")
                .send({
                    //worng email
                    email: 'sny@gmail.com',
                    //wrong answer
                    secretQuestion:"cricet",
                    newPassword:"sny123456"
                })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.should.have.property('text').eql("Wrong Answer Or Email");
                    ;


                    done();
                });
        });
      
      
    });




});



