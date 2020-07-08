const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../../../app');
const lib = require('../../lib');

chai.use(chaiHttp);

describe('Account', function() {

    before(async function() { await lib.build() });
    after(async function() { await lib.tearDown() });

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