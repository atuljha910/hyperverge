const db = require("./dbconnection");
module.exports.create = function () {
	let create_user = `create table if not exists user(
		user_id varchar(100) primary key,
		password varchar(100) not null,
		is_admin boolean 
	)`;

	db.query(create_user, function(err, results, fields) {
		if (err) throw err;
	});

	let create_seats = `create table if not exists seats(
		seat_no int primary key,
		user_id varchar(100) not null,
		p_name varchar(100) not null
	)`;

	db.query(create_seats, function(err, results, fields) {
		if (err) throw err;
	});
};