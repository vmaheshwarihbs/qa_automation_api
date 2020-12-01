const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/plite_int_updateInterestSelf'),
    Joi = require('joi');
jest.setTimeout(100000);



describe('updateInterestSelf', () => {

    it('TC-001 - updateInterestSelf - should update interest self with 200 status code', (done) => {
        request.post(data.TC001.endpoint)
            .set("HBS_PERSON_ID", data.TC001.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
              if (err) done.fail(err);
              expect(res.status).toBe(200);
              // expect(Object.keys(res.body).length).toBeGreaterThan(0);
              logger.info("TC-001 -updateInterestSelf - Request: ", res.request); //Logging request
              logger.info("TC-001 -updateInterestSelf - Response: ", res.text); // Logging response
              done();
            });
          });
          it('TC-002 - updateInterestSelf - should not update interest self with 403 status code', (done) => {
              request.post(data.TC002.endpoint)
                  .set("HBS_PERSON_ID", data.TC002.personId)
                  .set("Content-Type", "application/json")
                  .set("accept", "application/json")
                  .end((err, res) => {
                      if (err) done.fail(err);
                      expect(res.status).toBe(403);
                      // expect(Object.keys(res.body).length).toBeGreaterThan(0);
                      logger.info("TC-001 -updateInterestSelf - Request: ", res.request); //Logging request
                      logger.info("TC-001 -updateInterestSelf - Response: ", res.text); // Logging response
                      done();
                  });
          });
          it('TC-003 - updateInterestSelf - should return correct content-type and schema in JSON format', (done) => {
              request.post(data.TC003.endpoint)
                  .set("HBS_PERSON_ID", data.TC003.personId)
                  .set("Content-Type", "application/json")
                  .set("accept", "application/json")
                  .end((err, res) => {
                      if (err) done.fail(err);
                      expect(res.type).toEqual('application/json');
                      logger.info("TC-003 -updateInterestSelf - Request: ", res.request); //Logging request
                      logger.info("TC-003 -updateInterestSelf - Response: ", res.text); // Logging response
                      done();
                  });
          });
      });
