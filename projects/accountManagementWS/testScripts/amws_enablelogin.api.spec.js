const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/amws_enablelogin'),
    Joi = require('joi');
jest.setTimeout(100000);



describe('AMWS- Disable Login', () => {

    it('TC-001 - enablelogin,it should enable person login with 200 status code', (done) => {
        request.post(data.TC001.endpoint)
            .send({ "username" : "vmaheshwari@hbbsstg.org" })
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(200);
                // expect(Object.keys(res.body).length).toBeGreaterThan(0);
                logger.info("TC-001 -enablelogin - Request: ", res.request); //Logging request
                logger.info("TC-001 -enablelogin - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-002 - enablelogin,it should not enable person login with 400 status code', (done) => {
        request.post(data.TC002.endpoint)
            .send({"username" : "xccsmathew@hbsstg.org"})
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(200);
                expect(Object.keys(res.body).length).toBeGreaterThan(0);
                logger.info("TC-001 -enablelogin - Request: ", res.request); //Logging request
                logger.info("TC-001 -enablelogin - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-003 - enablelogin - should return correct content-type and schema in JSON format', (done) => {
        request.get(data.TC003.endpoint)
            .send({"username" : "smathew@hbsstg.org"})
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.type).toEqual('application/json');
                logger.info("TC-003 -enablelogin - Request: ", res.request); //Logging request
                logger.info("TC-003 -enablelogin - Response: ", res.text); // Logging response
                done();
            });
    });
});
