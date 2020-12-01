const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/amws_validatePasswordComplexity'),
    Joi = require('joi');
jest.setTimeout(100000);

describe('AWMS- validate Password Complexity', () => {

    it('TC-001 - validate Password Complexity - should validate password complexity with 200 status code', (done) => {
        request.post(data.TC001.endpoint)
            .send({"username" : "vmaheshwari@hbsstg.org", "password" : "One2ka$5", "firstName" : "Vaibhav", "lastName" : "Maheshwari" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(200);
                expect(Object.keys(res.body).length).toBeGreaterThan(0);
                logger.info("TC-001 -alumni_allEvents - Request: ", res.request); //Logging request
                logger.info("TC-001 -alumni_allEvents - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-002 - validate password complexity invalid input - should not validate password complexity with 400 status code', (done) => {
        request.post(data.TC002.endpoint)
            .send({"username" : "vmaheshwari@hbsstg.org","password" : "One2ka$5","firstName" : "Vaibhav", "lastName" : "Maheshwari" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
              if (err) done.fail(err);
              expect(res.status).toBe(400);
              logger.info("TC-001 -alumni_allEvents - Request: ", res.request); //Logging request
              logger.info("TC-001 -alumni_allEvents - Response: ", res.text); // Logging response
              done();
            });

    });
    it('TC-003 - validate password complexity - should return correct content-type and schema in JSON format', (done) => {
        request.get(data.TC003.endpoint)
            .send({"username" : "vmaheshwari@hbsstg.org","password" : "One2ka$5","firstName" : "Vaibhav", "lastName" : "Maheshwari" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
              if (err) done.fail(err);
              expect(res.type).toEqual('application/json');
              logger.info("TC-003 -alumni_allEvents - Request: ", res.request); //Logging request
              logger.info("TC-003 -alumni_allEvents - Response: ", res.text); // Logging response
              done();
            });
    });

});
