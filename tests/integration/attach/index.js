const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../../../app');
const lib = require('../../lib');

chai.use(chaiHttp);

describe('Attach', function() {

    before(async function() { await lib.build() });
    after(async function() { await lib.tearDown() });

    describe('Add', function() {

        it('should add a goal to an entry', function(done) {
            chai.request(app)
                .post('/api/attach')
                .set('authorization', lib.token)
                .send({
                    type: 'goal',
                    entryId: lib.entries[0].id,
                    id: lib.goals[0].id
                }) 
                .end(function(err, res) {
                    try {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body.message).to.equal('Goal added.');   
                        done();
                    } catch(err) {
                        done(err)
                    }
                });
        });

        it('should not add the same goal again to an entry', function (done) {
            chai.request(app)
                .post('/api/attach')
                .set('authorization', lib.token)
                .send({
                    type: 'goal',
                    entryId: lib.entries[0].id,
                    id: lib.goals[0].id
                }) 
                .end(function(err, res) {
                    try {
                        expect(err).to.be.null;
                        expect(res).to.have.status(402);
                        expect(res.body.message).to.equal('This goal has already been attached to this entry.');   
                        done();
                    } catch(err) {
                        done(err)
                    }
                });
        });

        it('should add a tag to an entry', function(done) {
            chai.request(app)
                .post('/api/attach')
                .set('authorization', lib.token)
                .send({
                    type: 'tag',
                    entryId: lib.entries[0].id,
                    id: lib.tags[0].id
                }) 
                .end(function(err, res) {
                    try {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body.message).to.equal('Tag added.');   
                        done();
                    } catch(err) {
                        done(err)
                    }
                });
        });

        it('should not add the same tag again to an entry', function (done) {
            chai.request(app)
                .post('/api/attach')
                .set('authorization', lib.token)
                .send({
                    type: 'tag',
                    entryId: lib.entries[0].id,
                    id: lib.tags[0].id
                }) 
                .end(function(err, res) {
                    try {
                        expect(err).to.be.null;
                        expect(res).to.have.status(402);
                        expect(res.body.message).to.equal('This tag has already been attached to this entry.');   
                        done();
                    } catch(err) {
                        done(err)
                    }
                });
        });

    });

    describe('Remove', function() {

        it('should remove a goal from an entry', async function() {
            let mappedGoals = await lib.models.MapGoal.findAll();
            let id = mappedGoals[0].id;
    
            let res = await chai.request(app)
                .delete('/api/attach')
                .query({ type: 'goal', id })
                .set('authorization', lib.token)
                .send();

            expect(res).to.have.status(200)
            expect(res.body.message).to.equal('Goal removed.');
        });

        it('should remove a tag from an entry', async function() {
            let mappedTags = await lib.models.MapTag.findAll();
            let id = mappedTags[0].id;
    
            let res = await chai.request(app)
                .delete('/api/attach')
                .query({ type: 'tag', id })
                .set('authorization', lib.token)
                .send();

            expect(res).to.have.status(200)
            expect(res.body.message).to.equal('Tag removed.');
        });

    });

})