let connection;
var oracledb = require('oracledb');

(async function() {
try{
   connection = await oracledb.getConnection({

      user          : "VMAHESHWARI",

      password      : "Sat3llit3",

      connectString : "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = odahbsstg-scan.hbs.edu)(PORT = 4756))(CONNECT_DATA =(SERVER = DEDICATED)(SERVICE_NAME = ORAENTC.HBS.EDU)))"

   });

   console.log(connection.oracleServerVersion);
   console.log("connection done")


 } catch(err) {
     console.log("Error: ", err);
   } finally {
     if (connection) {
       try {
         await connection.close();
       } catch(err) {
         console.log("Error when closing the database connection: ", err);
       }
     }
   }
 })()

connection.execute(
       `SELECT *
        FROM table`,
       [],
      function(err, result) {
         if (err) {
           console.error(err.message);
           return;
         }
         console.log(result.rows);
         let db_data = JSON.stringify(result.rows);
         fs.writeFileSync('./database_response/logcont_list.json', db_data);
      });
  });
