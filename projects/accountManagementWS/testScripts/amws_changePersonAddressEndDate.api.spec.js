const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/amws_changePersonAddressEndDate'),
    Joi = require('joi');
jest.setTimeout(100000);



describe('AMWS- changePersonAddressEndDate', () => {

    it('TC-001 - changePersonAddressEndDate,it should change person address end date with 200 status code', (done) => {
        request.post(data.TC001.endpoint)
            .send({ "personId" : "939059", "username" : "matsunil@gmail.com_inv", "personAddressEndDate": "2018-04-23T18:25:43.511Z" })
            // .set("HBS_PERSON_ID", data.TC001.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(200);
                expect(Object.keys(res.body).length).toBeGreaterThan(0);
                logger.info("TC-001 -changePersonAddressEndDate - Request: ", res.request); //Logging request
                logger.info("TC-001 -changePersonAddressEndDate - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-002 - changePersonAddressEndDate,it should not change person address end date with 400 status code', (done) => {
        request.post(data.TC002.endpoint)
            .send({ "personId" : "913131239059", "username" : "matsunil@gmail.com_inv", "personAddressEndDate": "2018-04-23T18:25:43.511Z" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(400);
                expect(Object.keys(res.body).length).toBeGreaterThan(0);
                logger.info("TC-001 -changePersonAddressEndDate - Request: ", res.request); //Logging request
                logger.info("TC-001 -changePersonAddressEndDate - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-003 - changePersonAddressEndDate - should return correct content-type and schema in JSON format', (done) => {
        request.get(data.TC003.endpoint)
            .send({ "personId" : "939059", "username" : "matsunil@gmail.com_inv", "personAddressEndDate": "2018-04-23T18:25:43.511Z" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.type).toEqual('application/json');
                logger.info("TC-003 -changePersonAddressEndDate - Request: ", res.request); //Logging request
                logger.info("TC-003 -changePersonAddressEndDate - Response: ", res.text); // Logging response
                done();
            });
    });
});
