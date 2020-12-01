const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/amws_setMFAO365'),
    Joi = require('joi');
jest.setTimeout(100000);

describe('Get-  setMFAO365', () => {

    it('TC-001 - setMFAO365 - should set MFAO365 with 200 status code', (done) => {
        request.post(data.TC001.endpoint)
            .send({ "username" : "pgangloff@gmail.com_inv", "requireDuoFlag" : "true" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(200);
                expect(Object.keys(res.body).length).toBeGreaterThan(0);
                logger.info("TC-001 -setMFAO365 - Request: ", res.request); //Logging request
                logger.info("TC-001 -setMFAO365 - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-002 -  setMFAO365 invalid input - should not set MFAO365 with 400 status code', (done) => {
        request.post(data.TC002.endpoint)
            .send({ "username" : "test@test"})
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
              if (err) done.fail(err);
              expect(res.status).toBe(400);
              logger.info("TC-001 -setMFAO365 - Request: ", res.request); //Logging request
              logger.info("TC-001 -setMFAO365 - Response: ", res.text); // Logging response
              done();
            });

    });
    it('TC-003 - setMFAO365 - should return correct content-type and schema in JSON format', (done) => {
        request.get(data.TC003.endpoint)
            .send({ "username" : "pgangloff@gmail.com_inv", "requireDuoFlag" : "true" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
              if (err) done.fail(err);
              expect(res.type).toEqual('application/json');
              logger.info("TC-003 -setMFAO365 - Request: ", res.request); //Logging request
              logger.info("TC-003 -setMFAO365 - Response: ", res.text); // Logging response
              done();
            });
    });
    it('TC-004 - setMFAO365 - should set MFAO365 with 200 status code', (done) => {
        request.post(data.TC004.endpoint)
            .send({ "username" : "pgangloff@gmail.com_inv", "requireDuoFlag" : "false" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(200);
                expect(Object.keys(res.body).length).toBeGreaterThan(0);
                logger.info("TC-001 -setMFAO365 - Request: ", res.request); //Logging request
                logger.info("TC-001 -setMFAO365 - Response: ", res.text); // Logging response
                done();
            });
    });

});
