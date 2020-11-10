let connection;
api_res = require('./responses/wsc_getAllExcercises');
var oracledb = require('oracledb');
const fs = require('fs');
const text = require('./crypt-text');





(async function() {
try{
   connection = await oracledb.getConnection({

      user          : "tmt_usr",

      password      : text,

      connectString : "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = odahbsstg-scan.hbs.edu)(PORT = 4756))(CONNECT_DATA =(SERVER = DEDICATED)(SERVICE_NAME = ORAENTC.HBS.EDU)))"

   });

console.log(connection.oracleServerVersion);
console.log("connection done")
result = await connection.execute('select * from exercise');
present = []
not_present = []
for (let x of api_res) {
	flag = false
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
fs.writeFileSync('./database_response/present.json', p_data);
let np_data = JSON.stringify(not_present);
fs.writeFileSync('./database_response/not_present.json', np_data);
}
catch (err) {
	console.log("Error: ", err);
} finally {
	if (connection) {
		try {
			await connection.close();
		} catch (err) {
			console.log("Error when closing the database connection: ", err);
		}
	}
}
})()
