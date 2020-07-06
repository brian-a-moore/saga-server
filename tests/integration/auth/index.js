const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../../../app');
const lib = require('../../lib');

chai.use(chaiHttp);

describe('Auth', function() {

    const samepleUser = {
        firstName: 'James',
        email: '007@mi6.gov',
        password: 'goldeneye',
        pin: '1234'
    }

    const newUser = {
        firstName: 'null',
        lastName: 'null',
        email: 'dev@null.org',
        password: 'devnull',
        pin: '1234'      
    }

    before(async function() { await lib.build() });
    after(async function() { await lib.tearDown() });

    describe('Sign Up', function() {

        it('Should sign up', function(done) {
            chai.request(app)
                .post('/api/auth/signup')
                .send(samepleUser)
                .end(function(err, res) {
                    try {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body.message).to.equal('Welcome to your saga, James!');
                        done();
                    } catch(err) {
                        done(err);
                    }
                });
        });

        it('Should not signup again if already signed up', function (done) {
            chai.request(app)
            .post('/api/auth/signup')
            .send(samepleUser)
            .end(function(err, res) {
                try {
                    expect(err).to.be.null;
                    expect(res).to.have.status(402);
                    expect(res.body.message).to.equal('An account with that e-mail address already exists.');
                    done();
                } catch(err) {
                    done(err);
                }
            });
        });

    });

    describe('Log In', function() {

        it('Should log in', function(done) {
            chai.request(app)
                .post('/api/auth/login')
                .send({
                    email: samepleUser.email,
                    password: samepleUser.password
                })
                .end(function(err, res) {
                    try {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body.message).to.equal('Welcome back, James!');
                        done();
                    } catch(err) {
                        done(err);
                    }
                });
        });

        it('User should not login if did not sign up', function (done) {
            chai.request(app)
            .post('/api/auth/login')
            .send({
                email: newUser.email,
                password: newUser.password
            })
            .end(function(err, res) {
                try {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.equal('No user with that e-mail address exists.');
                    done();
                } catch(err) {
                    done(err);
                }
            });
        });

    });

});