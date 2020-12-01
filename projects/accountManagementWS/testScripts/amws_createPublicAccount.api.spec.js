const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/amws_createPublicAccount'),
    Joi = require('joi');
jest.setTimeout(100000);

describe('AWMS- createPublicAccount', () => {

    it('TC-001 - createPublicAccount - should create public account with 200 status code', (done) => {
        request.post(data.TC001.endpoint)
            .send({ "personId" : "1232132132321", "username" : "pgangloff@gmail.com_inv", "password" : "M0ndayM0nday", "newPassword" : "M0ndayM0nday" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(200);
                expect(Object.keys(res.body).length).toBeGreaterThan(0);
                logger.info("TC-001 -createPublicAccount  - Request: ", res.request); //Logging request
                logger.info("TC-001 -createPublicAccount - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-002 - createPublicAccount - should not create public account with 400 status code', (done) => {
        request.post(data.TC002.endpoint)
            .send({ "personId" : "1312321501494", "username" : "pgangloff@gmail.com_inv", "password" : "M0ndayM0nday", "newPassword" : "M0ndayM0nday" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
              if (err) done.fail(err);
              expect(res.status).toBe(400);
              logger.info("TC-001 -createPublicAccount - Request: ", res.request); //Logging request
              logger.info("TC-001 -createPublicAccount - Response: ", res.text); // Logging response
              done();
            });

    });
    it('TC-003 - createPublicAccount - should return correct content-type and schema in JSON format', (done) => {
        request.get(data.TC003.endpoint)
            .send({ "personId" : "1232132132321", "username" : "pgangloff@gmail.com_inv", "password" : "M0ndayM0nday", "newPassword" : "M0ndayM0nday" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
              if (err) done.fail(err);
              expect(res.type).toEqual('application/json');
              logger.info("TC-003 -createPublicAccount - Request: ", res.request); //Logging request
              logger.info("TC-003 -createPublicAccount - Response: ", res.text); // Logging response
              done();
            });
    });

});
