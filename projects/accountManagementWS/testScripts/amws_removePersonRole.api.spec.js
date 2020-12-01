const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/amws_removePersonRole'),
    Joi = require('joi');
jest.setTimeout(100000);

describe('AWMS- removePersonRole', () => {

    it('TC-001 - removePersonRole - should remove person role with 200 status code', (done) => {
        request.post(data.TC001.endpoint)
            .send({ "personId" : "939059", "personRoleCode" : "PSU" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(200);
                expect(Object.keys(res.body).length).toBeGreaterThan(0);
                logger.info("TC-001 -removePersonRole  - Request: ", res.request); //Logging request
                logger.info("TC-001 -removePersonRole - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-002 - removePersonRole - should not remove person role with 400 status code', (done) => {
        request.post(data.TC002.endpoint)
            .send({ "personId" : "12312321321", "personRoleCode" : "PSU" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
              if (err) done.fail(err);
              expect(res.status).toBe(400);
              logger.info("TC-001 -removePersonRole - Request: ", res.request); //Logging request
              logger.info("TC-001 -removePersonRole - Response: ", res.text); // Logging response
              done();
            });

    });
    it('TC-003 - removePersonRole - should return correct content-type and schema in JSON format', (done) => {
        request.get(data.TC003.endpoint)
            .send({ "personId" : "939059", "personRoleCode" : "PSU" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
              if (err) done.fail(err);
              expect(res.type).toEqual('application/json');
              logger.info("TC-003 -removePersonRole - Request: ", res.request); //Logging request
              logger.info("TC-003 -removePersonRole - Response: ", res.text); // Logging response
              done();
            });
    });

});
