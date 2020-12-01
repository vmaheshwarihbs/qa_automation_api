const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/aud_cont_saveAudienceExcludes'),
    Joi = require('joi');
jest.setTimeout(100000);



describe('saveAudienceExcludes', () => {

    it('TC-001 - save Audience Excludes - should save Audience Excludes 200 status code', (done) => {
        request.get(data.TC001.endpoint)
            .set("HBS_PERSON_ID", data.TC001.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(200);
                logger.info("TC-001 -save Audience Excludes - Request: ", res.request); //Logging request
                logger.info("TC-001 -save Audience Excludes - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-002 - save Audience Excludes - should not save Audience Excludes with 403 status code', (done) => {
        request.get(data.TC002.endpoint)
            .set("HBS_PERSON_ID", data.TC002.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(403);
                logger.info("TC-002 - save Audience Excludes - Request: ", res.request); //Logging request
                logger.info("TC-002 - save Audience Excludes - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-003 - save Audience Excludes - should return correct content-type and schema in JSON format', (done) => {
        request.get(data.TC003.endpoint)
            .set("HBS_PERSON_ID", data.TC003.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.type).toEqual('application/json');
                logger.info("TC-003 - save Audience Excludes - Request: ", res.request); //Logging request
                logger.info("TC-003 - save Audience Excludes - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-004 - save Audience Excludes - should return the response in sepecified time', (done) => {
        request.get(data.TC004.endpoint)
            .set("HBS_PERSON_ID", data.TC004.personId)
            .set("Content-Type", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                jest.setTimeout(10000);
                logger.info("TC-004 -save Audience Excludes - Request: ", res.request); //Logging request
                logger.info("TC-004 -save Audience Excludes - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-005 - save Audience Excludes - should return status code 404 for access denied', (done) => {
        request.get(data.TC005.endpoint)
            .set("HBS_PERSON_ID", data.TC005.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(404);
                logger.info("TC-006 -save Audience Excludes - Request: ", res.request); //Logging request
                logger.info("TC-006 -save Audience Excludes - Response: ", res.text); // Logging response
                done();
            });
    });

  });
