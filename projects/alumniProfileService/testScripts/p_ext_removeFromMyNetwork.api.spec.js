const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/p_ext_removeFromMyNetwork'),
    Joi = require('joi');
jest.setTimeout(100000);



describe('removeFromMyNetwork', () => {

    it('TC-001 - remove From My Network - should return new meta data with 200 status code', (done) => {
        request.post(data.TC001.endpoint)
            .set("HBS_PERSON_ID", data.TC001.personId)
            .send({"interests":"sports"})
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
              if (err) done.fail(err);
              expect(res.status).toBe(200);
              // expect(Object.keys(res.body).length).toBeGreaterThan(0);
              logger.info("TC-001 -alumni_allEvents - Request: ", res.request); //Logging request
              logger.info("TC-001 -alumni_allEvents - Response: ", res.text); // Logging response
              done();
            });
          });
      });
