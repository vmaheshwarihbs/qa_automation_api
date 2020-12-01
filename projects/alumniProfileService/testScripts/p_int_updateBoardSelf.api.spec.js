const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/p_int_updateBoardSelf'),
    Joi = require('joi');
jest.setTimeout(100000);



describe('updateBoardSelf', () => {

    it('TC-001 - updateBoardSelf - should update board self with 200 status code', (done) => {
        request.post(data.TC001.endpoint)
            .set("HBS_PERSON_ID", data.TC001.personId)
            .send({"preferences": {},"volunteerOpportunities": ["String"]})
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
              if (err) done.fail(err);
              expect(res.status).toBe(200);
              expect(Object.keys(res.body).length).toBeGreaterThan(0);
              logger.info("TC-001 -updateBoardSelf - Request: ", res.request); //Logging request
              logger.info("TC-001 -updateBoardSelf - Response: ", res.text); // Logging response
              done();
            });
          });
          it('TC-002 - updateBoardSelf - should not update board self with 404 status code', (done) => {
              request.post(data.TC002.endpoint)
                  .set("HBS_PERSON_ID", data.TC002.personId)
                  .set("Content-Type", "application/json")
                  .set("accept", "application/json")
                  .end((err, res) => {
                      if (err) done.fail(err);
                      expect(res.status).toBe(403);
                      // expect(Object.keys(res.body).length).toBeGreaterThan(0);
                      logger.info("TC-001 -updateBoardSelf - Request: ", res.request); //Logging request
                      logger.info("TC-001 -updateBoardSelf - Response: ", res.text); // Logging response
                      done();
                  });
          });
          it('TC-003 - makeEmploymentPrimary - should return correct content-type and schema in JSON format', (done) => {
              request.post(data.TC003.endpoint)
                  .set("HBS_PERSON_ID", data.TC003.personId)
                  .set("Content-Type", "application/json")
                  .set("accept", "application/json")
                  .end((err, res) => {
                      if (err) done.fail(err);
                      expect(res.type).toEqual('application/json');
                      logger.info("TC-003 -updateBoardSelf - Request: ", res.request); //Logging request
                      logger.info("TC-003 -updateBoardSelf - Response: ", res.text); // Logging response
                      done();
                  });
          });

      });
