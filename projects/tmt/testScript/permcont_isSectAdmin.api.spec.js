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

  });
