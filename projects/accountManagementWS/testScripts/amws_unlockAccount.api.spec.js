const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/amws_unlockAccount'),
    Joi = require('joi');
jest.setTimeout(100000);

describe('Get- unlockAccount', () => {

    it('TC-001 - unlockAccount - should unlock account with 200 status code', (done) => {
        request.post(data.TC001.endpoint)
            .send({ "username" : "pgangloff@pierregangloff.com_inv" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(200);
                expect(Object.keys(res.body).length).toBeGreaterThan(0);
                logger.info("TC-001 -unlockAccount - Request: ", res.request); //Logging request
                logger.info("TC-001 -unlockAccount - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-002 -  unlockAccount invalid input - should not unclock the account with 400 status code', (done) => {
        request.post(data.TC002.endpoint)
            .send({ "username" : "matsunil" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
              if (err) done.fail(err);
              expect(res.status).toBe(400);
              logger.info("TC-001 -unlockAccount - Request: ", res.request); //Logging request
              logger.info("TC-001 -unlockAccount - Response: ", res.text); // Logging response
              done();
            });

    });
    it('TC-003 - unlockAccount - should return correct content-type and schema in JSON format', (done) => {
        request.get(data.TC003.endpoint)
            .send({ "username" : "matsunil@gmail.com_inv" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
              if (err) done.fail(err);
              expect(res.type).toEqual('application/json');
              logger.info("TC-003 -unlockAccount - Request: ", res.request); //Logging request
              logger.info("TC-003 -unlockAccount - Response: ", res.text); // Logging response
              done();
            });
    });

});
