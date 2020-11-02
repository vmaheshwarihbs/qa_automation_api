const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/amws_create_public_account'),
    Joi = require('joi');
jest.setTimeout(100000);

describe('AWMS-  Create Public Account', () => {

    it('TC-001 - createpublicaccount - should change the password with 200 status code', (done) => {
        request.post(data.TC001.endpoint)
            .send({ "username" : "matsunil@gmail.com", "password" : "M0ndayM0nday", "newPassword" : "M0ndayM0nday", "firstName" : "Sunil", "lastName" : "Mathew", "personRoleCode" : "PSU", "personRoleEndDate": "2018-04-23T18:25:43.511Z", "applicationTypeCode" : "SPEP", "confirmationFlag" : "false", "numHoursConfirmationEmailExpires": "24" })
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
    it('TC-002 -  createpublicaccount invalid input - should not change the password with 400 status code', (done) => {
        request.post(data.TC002.endpoint)
            .send({ "username" : "matsunil", "password" : "M0ndayM0nday", "newPassword" : "M0ndayM0nday", "firstName" : "Sunil", "lastName" : "Mathew", "personRoleCode" : "PSU", "personRoleEndDate": "2018-04-23T18:25:43.511Z", "applicationTypeCode" : "SPEPx", "confirmationFlag" : "jnskndskdsd", "numHoursConfirmationEmailExpires": "24" })
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
    it('TC-003 - createpublicaccount - should return correct content-type and schema in JSON format', (done) => {
        request.get(data.TC003.endpoint)
            .send({ "username" : "matsunil@gmail.com", "password" : "M0ndayM0nday", "newPassword" : "M0ndayM0nday", "firstName" : "Sunil", "lastName" : "Mathew", "personRoleCode" : "PSU", "personRoleEndDate": "2018-04-23T18:25:43.511Z", "applicationTypeCode" : "SPEP", "confirmationFlag" : "false", "numHoursConfirmationEmailExpires": "24" })
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