const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/aud_cont_removePersonFromExcludesAudience'),
    Joi = require('joi');
jest.setTimeout(100000);



describe('removePersonFromExcludesAudience', () => {

    it('TC-001 - removePersonFromExcludesAudience - should remove person from excludes audience  with 200 status code', (done) => {
        request.get(data.TC001.endpoint)
            .set("HBS_PERSON_ID", data.TC001.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(200);
                logger.info("TC-001 -removePersonFromExcludesAudience - Request: ", res.request); //Logging request
                logger.info("TC-001 -removePersonFromExcludesAudience- Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-002 - removePersonFromExcludesAudience - should not remove person from excludes audience with 403 status code', (done) => {
        request.get(data.TC002.endpoint)
            .set("HBS_PERSON_ID", data.TC002.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(403);
                logger.info("TC-002 - removePersonFromExcludesAudience - Request: ", res.request); //Logging request
                logger.info("TC-002 - removePersonFromExcludesAudience - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-003 - removePersonFromExcludesAudience - should return correct content-type and schema in JSON format', (done) => {
        request.get(data.TC003.endpoint)
            .set("HBS_PERSON_ID", data.TC003.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.type).toEqual('application/json');
                logger.info("TC-003 - removePersonFromExcludesAudience - Request: ", res.request); //Logging request
                logger.info("TC-003 - removePersonFromExcludesAudience - Response: ", res.text); // Logging response
                done();
            });
    });
});
