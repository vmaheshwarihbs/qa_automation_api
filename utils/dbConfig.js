let connection;
var oracledb = require('oracledb');

(async function dbconn() {
try{
   connection = await oracledb.getConnection({

      user          : 'tmt_usr',

      password      : text,

      connectString : '(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = odahbsstg-scan.hbs.edu)(PORT = 4756))(CONNECT_DATA =(SERVER = DEDICATED)(SERVICE_NAME = ORAENTC.HBS.EDU)))'

   });
   // $2b$10$v93rMcb20KkA7ka7KpVB0uEL5iIYMi1YBTQcsHUzxylbk5NLDd62u
   console.log(connection.oracleServerVersion);



} catch(err) {
    console.log("Error: ", err);
  }
  finally {
    if (connection) {
      try {
        await connection.close();
      } catch(err) {
        console.log("Error when closing the database connection: ", err);
      }
    }
  }
})()
