const app = require('../app');
const fs = require('fs');
const path = require('path');
const supertest = require('supertest');
const fileUtil = require('../src/api/utilities/fileUtil');
const dateUtil = require('../src/api/utilities/dateUtil');
const chai = require('chai');

expect = chai.expect;
request = supertest(app);

describe('Reward Test', (done) =>{
   
    before(() => {
        const filepath = fileUtil.saveDir;
        //clean test data file storage
        var files = fs.readdirSync(filepath);
        for(var file of files){
            fs.unlinkSync(path.join(filepath,file));
        }
    })

    it('NG, Invalid url path', (done) =>{
        request.get('/invalid/path')
        .send().then((res)=>{
            const body = res.body;
            expect(res.status).to.equal(404);
            expect(body).to.contain.property('error');
            expect(body.error.message).to.equal('Not found');
            done();
        });
    });

    it('OK, Generate reward', (done) =>{
       request.get('/users/1/rewards?at=2020-03-19T12:00:00Z')
       .send().then((res)=>{
            const body = res.body;
            expect(body).to.contain.property('data');
            expect(body.data).to.be.a('array');
            //first day
            expect(body.data[0].availableAt).to.equal('2020-03-15T00:00:00Z');
            expect(body.data[0].redeemedAt).to.equal(null);
            expect(body.data[0].expiresAt).to.equal('2020-03-16T00:00:00Z');
            //second day
            expect(body.data[1].availableAt).to.equal('2020-03-16T00:00:00Z');
            expect(body.data[1].redeemedAt).to.equal(null);
            expect(body.data[1].expiresAt).to.equal('2020-03-17T00:00:00Z');
            //third day
            expect(body.data[2].availableAt).to.equal('2020-03-17T00:00:00Z');
            expect(body.data[2].redeemedAt).to.equal(null);
            expect(body.data[2].expiresAt).to.equal('2020-03-18T00:00:00Z');
            //fourth day
            expect(body.data[3].availableAt).to.equal('2020-03-18T00:00:00Z');
            expect(body.data[3].redeemedAt).to.equal(null);
            expect(body.data[3].expiresAt).to.equal('2020-03-19T00:00:00Z');
            //fifth day
            expect(body.data[4].availableAt).to.equal('2020-03-19T00:00:00Z');
            expect(body.data[4].redeemedAt).to.equal(null);
            expect(body.data[4].expiresAt).to.equal('2020-03-20T00:00:00Z');
            //sixth day
            expect(body.data[5].availableAt).to.equal('2020-03-20T00:00:00Z');
            expect(body.data[5].redeemedAt).to.equal(null);
            expect(body.data[5].expiresAt).to.equal('2020-03-21T00:00:00Z');
            //seventh day
            expect(body.data[6].availableAt).to.equal('2020-03-21T00:00:00Z');
            expect(body.data[6].redeemedAt).to.equal(null);
            expect(body.data[6].expiresAt).to.equal('2020-03-22T00:00:00Z');
            done();
       });
    });

    it('NG, Generate reward => Invalid parameter date', (done) =>{
        request.get('/users/1/rewards?at=2020-01-11')
        .send().then((res)=>{
             const body = res.body;
             //bad request
             expect(res.status).to.equal(400);
             expect(body).to.contain.property('error');
             expect(body.error.message).to.equal('Invalid request parameter');
             done();
        });
     });

    it('OK, Redeem reward', (done) =>{
        //Since we cannot modify current server time
        //Use current date as parameter
        var curDate = new Date();
        var availDate = dateUtil.resetTime(new Date());

        //formated date
        curDate = dateUtil.formatDate(curDate, 'YYYY-MM-DDThh:mm:ssZ');
        availDate = dateUtil.formatDate(availDate, 'YYYY-MM-DDThh:mm:ssZ');
        
        //Generate data base on curDate
        request.get('/users/1/rewards?at='+curDate)
        .send().then((res)=>{
            //Redeem reward base on curdate
            request.patch('/users/1/rewards/'+availDate+'/redeem')
            .send().then((res)=>{
                const body = res.body;
                expect(body).to.contain.property('data');
                expect(body.data.redeemedAt).to.not.equal(null);
                done();
            });
       });
    }); 

    it('OK, Generate reward => Fetch after redeemed (Check if data is persisted)', (done) =>{
        //data is based on previous test case redeemed
        var availDate = dateUtil.resetTime(new Date());

        //formated date
        availDate = dateUtil.formatDate(availDate, 'YYYY-MM-DDThh:mm:ssZ');
        
        //Generate data base on curDate
        request.get('/users/1/rewards?at='+availDate)
        .send().then((res)=>{
            //Redeem reward base on curdate
            const body = res.body;
            expect(body).to.contain.property('data');
            expect(body.data).to.be.a('array');
            const data = body.data;
            //find target data
            const target = data.filter((reward) =>{
                return reward.availableAt === availDate
            });

            //Check if redeem at is changed
            expect(target[0].redeemedAt).to.not.equal(null);
            done();
       });
    }); 

    it('NG, Redeem reward => Invalid parameter date', (done) =>{
        request.patch('/users/1/rewards/2012/redeem')
        .send().then((res)=>{
             const body = res.body;
             //bad request
             expect(res.status).to.equal(400);
             expect(body).to.contain.property('error');
             expect(body.error.message).to.equal('Invalid request parameter');
             done();
        });
    });

    it('NG, Redeem reward => Reward not generated (Not found)', (done) =>{
        request.patch('/users/2/rewards/2020-12-16T00:00:00Z/redeem')
        .send().then((res)=>{
             const body = res.body;
             //bad request
             expect(res.status).to.equal(400);
             expect(body).to.contain.property('error');
             expect(body.error.message).to.equal('This reward is already expired');
             done();
        });
    });

    it('NG, Redeem reward => Reward from yesterday (Expired)', (done) =>{
        //Used date is yesterday
        var yesterdayDate = dateUtil.resetTime(new Date());
            yesterdayDate.setDate(yesterdayDate.getDate() - 1);

        //Format date to ISO
        yesterdayDate = dateUtil.formatDate(yesterdayDate, 'YYYY-MM-DDThh:mm:ssZ');
        
        //Generate reward first in case not yet generated
        request.get('/users/1/rewards?at='+yesterdayDate)
        .send().then((res)=>{
            //Redeem reward from yesterday
            request.patch('/users/1/rewards/'+yesterdayDate+'/redeem')
            .send().then((res)=>{
                const body = res.body;
                //bad request
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error.message).to.equal('This reward is already expired');
                done();
            });
        });
    });


})