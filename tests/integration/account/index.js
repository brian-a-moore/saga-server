const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../../../app');
const lib = require('../../lib');

chai.use(chaiHttp);

describe('Account', function() {

    before(async function() { await lib.build() });
    after(async function() { await lib.tearDown() });

    describe('Get', function() {

        it('should retrieve account details', function(done) {

            const accountDetails = {
                firstName: 'John',
                email: 'john.doe@email.com',
                darkMode: false,
                summaryLength: 10,
                timestampBefore: true,
                defaultBackgroundColor: null,
                defaultTexture: null,
                defaultFont: null
            };

            chai.request(app)
                .get('/api/account')
                .set('authorization', lib.token)
                .end(function(err, res) {
                    try {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body.account.firstName).to.equal(accountDetails.firstName);
                        expect(res.body.account.email).to.equal(accountDetails.email);  
                        expect(res.body.account.darkMode).to.equal(accountDetails.darkMode);  
                        expect(res.body.account.summaryLength).to.equal(accountDetails.summaryLength);  
                        expect(res.body.account.timestampBefore).to.equal(accountDetails.timestampBefore);  
                        expect(res.body.account.defaultBackgroundColor).to.equal(accountDetails.defaultBackgroundColor);
                        expect(res.body.account.defaultTexture).to.equal(accountDetails.defaultTexture); 
                        expect(res.body.account.defaultFont).to.equal(accountDetails.defaultFont);   
                        done();
                    } catch(err) {
                        done(err)
                    }
                });
        });

    });

    describe('Update', function() {

        it('Should update', function(done) {
            chai.request(app)
                .put('/api/account')
                .set('authorization', lib.token)
                .send({ darkMode: true }) 
                .end(function(err, res) {
                    try {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body.message).to.equal('Account updated.');   
                        done();
                    } catch(err) {
                        done(err)
                    }
                });
        });

        it('Should not allow you to set the password to the same password that exists', function(done) {
            chai.request(app)
                .put('/api/account')
                .set('authorization', lib.token)
                .send({ password: 'password' }) 
                .end(function(err, res) {
                    try {
                        expect(err).to.be.null;
                        expect(res).to.have.status(422);
                        expect(res.body.message).to.equal('Your password must be different from your previous password.');   
                        done();
                    } catch(err) {
                        done(err)
                    }
                });
        });

        it('Should not allow you to set the PIN to the same PIN that exists', function(done) {
            chai.request(app)
                .put('/api/account')
                .set('authorization', lib.token)
                .send({ pin: '0000' }) 
                .end(function(err, res) {
                    try {
                        expect(err).to.be.null;
                        expect(res).to.have.status(422);
                        expect(res.body.message).to.equal('Your PIN must be different from your previous PIN.');   
                        done();
                    } catch(err) {
                        done(err)
                    }
                });
        });

    });

    describe('Delete', function() {

        it('Should delete', function(done) {
            chai.request(app)
                .delete('/api/account')
                .set('authorization', lib.token)
                .end(function(err, res) {
                    try {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body.message).to.equal('Account deleted.');   
                        done();  
                    } catch(err) {
                        done(err)
                    }
                });
        });

    });

});