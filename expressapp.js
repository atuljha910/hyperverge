const db = require("./dbconnection");
const create_tables = require("./create_table");
const express = require("express");
const session = require("express-session");
var bodyParser = require("body-parser");
const app = express();
create_tables.create();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// search for express session u will find doc
app.use(
  session({
    secret: "my secret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

function isLoggedin(session) {
	return session.user_id !== null;
}
app.post("/register", function(req, res) {
	var sq = `select * from user where user_id="${req.body.user_id}"`;
	console.log(sq);
	db.query(sq, function(err, rows, fields) {
		if (err) throw err;
		console.log(rows.length);
		if (rows.length >= 1) {
			res.send("already exists");
		} else {
			if (req.body.pass1 == req.body.pass2) {
				var sql = `INSERT INTO user (user_id, password, is_admin) VALUES ("${req.body.user_id}","${req.body.pass1}",0)`;
				db.query(sql, function(err, rows, fields) {
					if (err) throw err;
					console.log("1 record created");
					res.send("User created");
				});
			}
		}
	});
	
});

app.post("/login", function(req, res) {
	var sql = `select * from user where user_id = "${req.body.user_id}"`;
	db.query (sql, function(err, rows, fields) {
		if (rows.length == 0 || req.body.password != rows[0].password) {
			res.send("wrong credentials");
		}
		// set the session variable or generate json web token
		//initially i was using session as it is easy;
		
		req.session.userId = "atul"; //hard coded
		//now u can check this session varibale for log in
		//res.send(req.session);
		res.send("login successful"); 

	});
	// you have to make sure u r loggined 
});
app.get("/testlogin", function(req, res) {res.send(isLoggedin(req.session))});
app.get("/logout", function(req, res) {
	// unset session value
	req.session.user_id = ""; // check for null / empty string; i ma not sure
	res.send(isLoggedin(req.session) ? "suceessful" : "Not Succcessful")
});

app.get("/home", function(req, res) {
	if(isLoggedin(req.session) ){
	   	var sql = "select * from seats";
		db.query(sql, function(err, rows, fields) {
			if (err) throw err;
			res.json(rows);
		});
	} else {
	   res.send("Not loggedin");
	}
	
});

app.post ("/home", function(req, res) {
	if (isLoggedin(req.session)) {
		var i;
    console.log(req.body);
    //var s = "hh";
		for(i = 0; i < req.body.seats.length; i++) {
      var sq = `INSERT INTO seats(seat_no, user_id, p_name) VALUES(${req.body.seats[i]}, "${req.body.user_id}", "${req.body.p_names[i]}")`;
      //console.log(typeof(req.body.seats[i]))
      //var x = req.body.seats[i].toString();
      db.query(sq, function(err, rows, fields) {
        //console.log(rows[0]);
        //console.log(rows[1]);
				if (err) throw err;
        
			}); 
		}
    res.send("seats booked");
	} else {
		res.send("not logged in");
	}
});

app.post("/home/admin", function(req, res) {
	var sql = "select * from seats";
	db.query(sql, function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
	});
	if (req.body.reset == 1) {
		var sql = "delete from seats";
		db.query(sql, function(err, rows,fields) {
			if (err) throw err;
			console.log("all records of seats created");
		});
	}
});

app.listen(3000, function(req, res) {
	console.log("server is running at 127.0.0.1:3000");
});