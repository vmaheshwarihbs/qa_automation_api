const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/aud_cont_saveAudienceIncludes'),
    Joi = require('joi');
jest.setTimeout(100000);



describe('saveAudienceIncludes', () => {

    it('TC-001 - saveAudienceIncludes - should save audience includes 200 status code', (done) => {
        request.get(data.TC001.endpoint)
            .set("HBS_PERSON_ID", data.TC001.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(200);
                logger.info("TC-001 -saveAudienceIncludes - Request: ", res.request); //Logging request
                logger.info("TC-001 -saveAudienceIncludes - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-002 - saveAudienceIncludes - should not save audience includes with 403 status code', (done) => {
        request.get(data.TC002.endpoint)
            .set("HBS_PERSON_ID", data.TC002.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(403);
                logger.info("TC-002 - saveAudienceIncludes - Request: ", res.request); //Logging request
                logger.info("TC-002 - saveAudienceIncludes - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-003 - saveAudienceIncludes - should return correct content-type and schema in JSON format', (done) => {
        request.get(data.TC003.endpoint)
            .set("HBS_PERSON_ID", data.TC003.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.type).toEqual('application/json');
                logger.info("TC-003 - saveAudienceIncludes - Request: ", res.request); //Logging request
                logger.info("TC-003 - saveAudienceIncludes - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-004 - saveAudienceIncludes - should return the response in sepecified time', (done) => {
        request.get(data.TC004.endpoint)
            .set("HBS_PERSON_ID", data.TC004.personId)
            .set("Content-Type", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                jest.setTimeout(10000);
                logger.info("TC-004 -saveAudienceIncludes - Request: ", res.request); //Logging request
                logger.info("TC-004 -saveAudienceIncludes - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-005 - saveAudienceIncludes - should return status code 404 for access denied', (done) => {
        request.get(data.TC005.endpoint)
            .set("HBS_PERSON_ID", data.TC005.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(404);
                logger.info("TC-006 -saveAudienceIncludes - Request: ", res.request); //Logging request
                logger.info("TC-006 -saveAudienceIncludes - Response: ", res.text); // Logging response
                done();
            });
    });

  });
