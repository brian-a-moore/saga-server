// Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../../../app');
const lib = require('../../lib');

// Middleware
chai.use(chaiHttp);

describe('Entry', function() {

    before(async function() { await lib.build() });
    after(async function() { await lib.tearDown() });

    describe('Create', function() {

        const entry = {
            title: 'title',
            context: 'description'
        };

        it('should create', function(done) {

            chai.request(app)
                .post('/api/entry')
                .set('authorization', lib.token)
                .send(entry) 
                .end(function(err, res) {
                    try {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body.message).to.equal('Entry created.');   
                        done();
                    } catch(err) {
                        done(err)
                    }
                });

        });
        
    });

    describe('Update', function() {

        it('should update the entry if it exists', async function() {

            let entries = await lib.models.Entry.findAll();
            let id = entries[0].id;
    
            let res = await chai.request(app)
                .put('/api/entry')
                .query({ id })
                .set('authorization', lib.token)
                .send({ title: 'new title' });

            expect(res).to.have.status(200)
            expect(res.body.message).to.equal('Entry updated.');

        });

    });

    describe('Delete', function() {

        it('Should delete entry', async function() {

            let entries = await lib.models.Entry.findAll();
            let id = entries[0].id;
    
            let res = await chai.request(app)
                .delete('/api/entry')
                .query({ id })
                .set('authorization', lib.token)
                .send();

            expect(res).to.have.status(200)
            expect(res.body.message).to.equal('Entry deleted.');

        });

    });

});