// Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../../../app');
const lib = require('../../lib');

// Middleware
chai.use(chaiHttp);

describe.only('Tag', function() {

    before(async function() { await lib.build() });
    after(async function() { await lib.tearDown() });

    describe('Create', function() {

        const tag = {
            title: 'A Tag',
            aliases: ['Tags', 'Tagging', 'Tagger']
        };

        it('should create', function(done) {
            chai.request(app)
                .post('/api/tag')
                .set('authorization', lib.token)
                .send(tag) 
                .end(function(err, res) {
                    try {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body.message).to.equal('Tag created.');   
                        done();
                    } catch(err) {
                        done(err)
                    }
                });
        });

        it('should not create if already exists', function(done) {
            chai.request(app)
                .post('/api/tag')
                .set('authorization', lib.token)
                .send(tag) 
                .end(function(err, res) {
                    try {
                        expect(err).to.be.null;
                        expect(res).to.have.status(402);
                        expect(res.body.message).to.equal('A tag with that name already exists.');   
                        done();
                    } catch(err) {
                        done(err)
                    }
                });
            });
    });

    // describe('Update', async function() {
    // });

    // describe('Delete', function() {

    //     it('Should delete', function(done) {
    //     });

    // });

});