const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/amws_person_match'),
    Joi = require('joi');
jest.setTimeout(100000);



describe('AMWS- Person Detail', () => {

    it('TC-001 - personmatch ,it should return person match with 200 status code', (done) => {
        request.post(data.TC001.endpoint)
            .send({ "username" : "allman" })
            // .set("HBS_PERSON_ID", data.TC001.personId)
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
    it('TC-002 - personmatch,it should not return person match with 400 status code', (done) => {
        request.post(data.TC002.endpoint)
            .send({"username" : "xccsmathew@hbsstg.org"})
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(200);
                expect(Object.keys(res.body).length).toBeGreaterThan(0);
                logger.info("TC-001 -persondetails - Request: ", res.request); //Logging request
                logger.info("TC-001 -persondetails - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-003 - personmatch - should return correct content-type and schema in JSON format', (done) => {
        request.get(data.TC003.endpoint)
            .send({"username" : "smathew@hbsstg.org"})
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.type).toEqual('application/json');
                logger.info("TC-003 -persondetails - Request: ", res.request); //Logging request
                logger.info("TC-003 -persondetails - Response: ", res.text); // Logging response
                done();
            });
    });
});
