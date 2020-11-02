const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/amws_set_passchange'),
    Joi = require('joi');
jest.setTimeout(100000);



describe('AMWS- Set Password Change', () => {

    it('TC-001 - setpasswordchange,it should change the password status of person account with 200 status code', (done) => {
        request.post(data.TC001.endpoint)
            .send({ "username" : "vmaheshwari@hbsstg.org","requirePasswordChangeFlag" : "false"  })
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
    it('TC-002 - setpasswordchange invalid input,it should not change the password of person account with 400 status code', (done) => {
        request.post(data.TC002.endpoint)
            .send({ "username" : "eevmaheshwari@hbsssstg.org","requirePasswordChangeFlag" : "false"  })
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
});
