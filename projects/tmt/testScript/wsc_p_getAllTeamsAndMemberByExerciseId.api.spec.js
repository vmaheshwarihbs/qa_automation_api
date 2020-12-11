const superTest = require('supertest'),
    config = require('config'),
    request = superTest(global.ENV),
    Logger = require('../../../utils/logger'),
    logger = new Logger('superTest'),
    api_key = global.APIKEY,
    // schema = require('../schema/events'),
    data = require('../testData/wsc_p_getAllTeamsAndMemberByExerciseId'),
    Joi = require('joi');

    const fs = require('fs');
    let connection;
    var oracledb = require('oracledb');
    const text = require('../../../crypt-text');

jest.setTimeout(100000);



describe('GET_AllTeamAndMemberByExerciseId', () => {

    it('TC-001 - All Team And Member By ExerciseId - should return all team and member by exerciseId with 200 status code', (done) => {
        request.post(data.TC001.endpoint)
            .set("HBS_PERSON_ID", data.TC001.personId)
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
    it('TC-002 - All Team And Member By ExerciseId - should not return all execises with 403 status code', (done) => {
        request.post(data.TC002.endpoint)
            .set("HBS_PERSON_ID", data.TC002.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(403);
                logger.info("TC-001 -alumni_allEvents - Request: ", res.request); //Logging request
                logger.info("TC-001 -alumni_allEvents - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-003 - All Exercises - should return correct content-type and schema in JSON format', (done) => {
        request.post(data.TC003.endpoint)
            .set("HBS_PERSON_ID", data.TC003.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.type).toEqual('application/json');
                logger.info("TC-003 -alumni_allEvents - Request: ", res.request); //Logging request
                logger.info("TC-003 -alumni_allEvents - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-004 - All Team And Member By ExerciseId - should return the response in sepecified time', (done) => {
        request.post(data.TC004.endpoint)
            .set("HBS_PERSON_ID", data.TC004.personId)
            .set("Content-Type", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                jest.setTimeout(10000);
                logger.info("TC-004 -alumni_allEvents - Request: ", res.request); //Logging request
                logger.info("TC-004 -alumni_allEvents - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-005 - All Team And Member By ExerciseId - should return status code 404 for access denied', (done) => {
        request.post(data.TC005.endpoint)
            .set("HBS_PERSON_ID", data.TC005.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end((err, res) => {
                if (err) done.fail(err);
                expect(res.status).toBe(404);
                logger.info("TC-006 -alumni_allEvents - Request: ", res.request); //Logging request
                logger.info("TC-006 -alumni_allEvents - Response: ", res.text); // Logging response
                done();
            });
    });
    it('TC-006 - All Exercises - validating data with database', (done) => {
        request.get(data.TC006.endpoint)
            .set("HBS_PERSON_ID", data.TC006.personId)
            .set("Content-Type", "application/json")
            .set("accept", "application/json")
            .end(async(err, res) => {
                if (err) done.fail(err);
                jest.setTimeout(10000);
                logger.info("TC-004 -All Exercises - Request: ", res.request); //Logging request
                logger.info("TC-004 -All Exercises - Response: ", res.text); // Logging response
                try{
                   connection =  await oracledb.getConnection({
                     user          : "tmt_usr",
                     password      : text,
                     connectString : "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = odahbsstg-scan.hbs.edu)(PORT = 4756))(CONNECT_DATA =(SERVER = DEDICATED)(SERVICE_NAME = ORAENTC.HBS.EDU)))"
                   });
                   console.log(connection.oracleServerVersion);
                   console.log("connection done")
                   let result =  await connection.execute('select * from exercise where exercise_id=602432;');
                   // console.log(result)
                   let present = []
                   let not_present = []
                   for (let x of res.body) {
                   let flag = false
                     for (let y of result.rows) {
                       if (x['id'] == y[0] && x['publicName'] == y[3]) {
                         flag = true
                         break;
                       }
                     }
                     if (flag == true) {
                       present.push(x)
                     } else {
                       not_present.push(x)
                     }
                   }
                   let p_data = JSON.stringify(present);
                   fs.writeFileSync('./database_response/p_getbyid_present.json', p_data);
                   let np_data = JSON.stringify(not_present);
                   fs.writeFileSync('./database_response/p_getbyid_not_present.json', np_data);
                 }
                 catch (err) {
                   console.log("Error: ", err);
                 } finally {
                   if (connection) {
                     try {
                        connection.close();
                     } catch (err) {
                       console.log("Error when closing the database connection: ", err);
                     }
                   }
                 }
               done();
             });
           });
});
