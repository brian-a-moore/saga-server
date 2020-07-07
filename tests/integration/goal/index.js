// Dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../../../app');
const lib = require('../../lib');
const moment = require('moment');

// Middleware
chai.use(chaiHttp);

describe('Goal', function() {

    before(async function() { await lib.build() });
    after(async function() { await lib.tearDown() });

    describe('Create', function() {

        const goal = {
            title: 'title',
            description: 'description',
            typeId: 1,
            targetDate: moment().format('YYYY-MM-DD HH:MM:ss')
        };

        it('should create', function(done) {

            chai.request(app)
                .post('/api/goal')
                .set('authorization', lib.token)
                .send(goal) 
                .end(function(err, res) {
                    try {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body.message).to.equal('Goal created.');   
                        done();
                    } catch(err) {
                        done(err)
                    }
                });

        });

        it('should not create if already exists', function(done) {

            chai.request(app)
                .post('/api/goal')
                .set('authorization', lib.token)
                .send(goal) 
                .end(function(err, res) {
                    try {
                        expect(err).to.be.null;
                        expect(res).to.have.status(402);
                        expect(res.body.message).to.equal('A goal with that title already exists.');   
                        done();
                    } catch(err) {
                        done(err)
                    }
                });

        });
        
    });

    describe('Update', function() {

        it('should update the goal if it exists', async function() {

            let goals = await lib.models.Goal.findAll();
            let id = goals[0].id;
    
            let res = await chai.request(app)
                .put('/api/goal')
                .query({ id })
                .set('authorization', lib.token)
                .send({ title: 'new title' });
            expect(res).to.have.status(200)
            expect(res.body.message).to.equal('Goal updated.');

        });

        it('should not update the goal if the title already exists', async function() {

            let goals = await lib.models.Goal.findAll();
            let id = goals[0].id;
    
            let res = await chai.request(app)
                .put('/api/goal')
                .query({ id })
                .set('authorization', lib.token)
                .send({ title: 'new title' });

            expect(res).to.have.status(402)
            expect(res.body.message).to.equal('A goal with that title already exists.');

        });

    });

    describe('Delete', function() {

        it('Should delete goal', async function() {

            let goals = await lib.models.Goal.findAll();
            let id = goals[0].id;
    
            let res = await chai.request(app)
                .delete('/api/goal')
                .query({ id })
                .set('authorization', lib.token)
                .send();

            expect(res).to.have.status(200)
            expect(res.body.message).to.equal('Goal deleted.');

        });

    });

});