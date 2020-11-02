let connection;
var oracledb = require('oracledb');

(async function() {
try{
   connection = await oracledb.getConnection({

      user          : process.env.NODE_ORACLEDB_USER,

      password      : process.env.NODE_ORACLEDB_PASSWORD,

      connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING

   });

   console.log(connection.oracleServerVersion);


   connection.close();

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
