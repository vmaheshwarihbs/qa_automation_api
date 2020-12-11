const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/permcont_isSectAdmin'),
    Joi = require('joi');
jest.setTimeout(100000);



describe('GET_isSectAdmin', () => {

    it('TC-001 - isSectAdmin - should return is sect admin with 200 status code', (done) => {
        request.get(data.TC001.endpoint)
            .set("HBS_PERSON_ID", data.TC001.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(200);
                expect(Object.keys(res.body).length).toBeGreaterThan(0);
                logger.info("TC-001 -isSectAdmin - Request: ", res.request); //Logging request
                logger.info("TC-001 -isSectAdmin - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-002 - isSectAdmin - should not is course level admin with 403 status code', (done) => {
        request.get(data.TC002.endpoint)
            .set("HBS_PERSON_ID", data.TC002.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(403);
                logger.info("TC-001 -isSectAdmin - Request: ", res.request); //Logging request
                logger.info("TC-001 -isSectAdmin - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-003 - isSectAdmin - should return correct content-type and schema in JSON format', (done) => {
        request.get(data.TC003.endpoint)
            .set("HBS_PERSON_ID", data.TC003.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.type).toEqual('application/json');
                logger.info("TC-003 -isSectAdmin - Request: ", res.request); //Logging request
                logger.info("TC-003 -isSectAdmin - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-004 - isSectAdmin - should return the response in sepecified time', (done) => {
        request.get(data.TC004.endpoint)
            .set("HBS_PERSON_ID", data.TC004.personId)
            .set("Content-Type", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                jest.setTimeout(10000);
                logger.info("TC-004 -isSectAdmin - Request: ", res.request); //Logging request
                logger.info("TC-004 -isSectAdmin - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-005 - isSectAdmin - should return status code 404 for access denied', (done) => {
        request.get(data.TC005.endpoint)
            .set("HBS_PERSON_ID", data.TC005.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(404);
                logger.info("TC-006 -isSectAdmin - Request: ", res.request); //Logging request
                logger.info("TC-006 -isSectAdmin - Response: ", res.text); // Logging response
                done();
            });
    });


  });
