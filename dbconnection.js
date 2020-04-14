var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345" ,
  database: "hyped",
	multipleStatements: true
});
console.log("test!");
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
});

module.exports = connection;
