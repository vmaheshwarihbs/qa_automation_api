const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/amws_person_exists'),
    Joi = require('joi');
jest.setTimeout(100000);



describe('AMWS- Person Exists', () => {

    it('TC-001 - personexists,it should return person exists or not with 200 status code', (done) => {
        request.post(data.TC001.endpoint)
            .send({ "username" : "vmaheshwari@hbbsstg.org" })
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
});
