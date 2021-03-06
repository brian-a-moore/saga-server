const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../../../app');
const lib = require('../../lib');

chai.use(chaiHttp);

describe('Tag', function() {

    before(async function() { await lib.build() });
    after(async function() { await lib.tearDown() });

    describe('Create', function() {

        it('should create', function(done) {

            chai.request(app)
                .post('/api/tag')
                .set('authorization', lib.token)
                .send({ title: 'A sample tag' }) 
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
                .send({ title: 'A sample tag' }) 
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

    describe('Update', function() {

        it('should update the tag if it exists', async function() {

            let tags = await lib.models.Tag.findAll({ where: { title: 'A sample tag' }});
            let id = tags[0].id;
    
            let res = await chai.request(app)
                .put('/api/tag')
                .query({ id })
                .set('authorization', lib.token)
                .send({ title: 'new sample tag' });
            expect(res).to.have.status(200)
            expect(res.body.message).to.equal('Tag updated.');

        });

        it('should not update the tag if the name already exists', async function() {

            let tags = await lib.models.Tag.findAll({ where: { title: 'new sample tag' }});
            let id = tags[0].id;
    
            let res = await chai.request(app)
                .put('/api/tag')
                .query({ id })
                .set('authorization', lib.token)
                .send({ title: 'new sample tag' });

            expect(res).to.have.status(402)
            expect(res.body.message).to.equal('A tag with that name already exists.');

        });

    });

    describe('Delete', function() {

        it('Should delete tag', async function() {

            let tags = await lib.models.Tag.findAll({ where: { title: 'new sample tag' }});
            let id = tags[0].id;
    
            let res = await chai.request(app)
                .delete('/api/tag')
                .query({ id })
                .set('authorization', lib.token)
                .send();

            expect(res).to.have.status(200)
            expect(res.body.message).to.equal('Tag deleted.');

        });

    });

});