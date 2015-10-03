var mysql = require('mysql');

function User(name,surname,dateOfBirth,city){
	this.name = name;
	this.surname = surname;
	this.dateOfBirth = dateOfBirth;
	this.city = city;
}

var users=[];

users[0] = new User('Nermin','Demir',new Date(95,0,30),'Kakanj');
users[1] = new User('Amel','Sisic',new Date(95,1,8),'Kakanj');
users[2] = new User('Said','Sikira',new Date(95,2,19),'Kakanj');

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'user',
	password : 'pass',
	database : 'baza'
});

connection.connect(function (err) {
	if (err) return console.error(err);

	console.log('Connected');
});

connection.query('CREATE TABLE IF NOT EXISTS users (' +
	'userId int NOT NULL AUTO_INCREMENT,' +
	'name varchar(255),' +
	'surname varchar(255),' +
	'dateOfBirth datetime,' +
	'city varchar(255),' +
	'PRIMARY KEY(userId)' +
	');',function (err){
	if (err) return console.log(err);
	console.log('Table created');
});

function clearTable(conn,cb){
	conn.query('DELETE FROM users;',function(err){
		if (err) return console.error(err);

		console.log('Table cleared');

		if (cb) cb();
	})
}

clearTable(connection);

for (var i = 0; i < users.length; i++) {
connection.query('INSERT INTO users (name,surname,dateOfBirth,city) VALUES("' +
	users[i].name + '","' +
	users[i].surname + '","' +
	users[i].dateOfBirth + '","' +
	users[i].city + '");'
	,function(err){
	if(err) return console.error(err);

	console.log('User saved');
	});
};

connection.query('SELECT * FROM users;',function(err,result){
	if (err) console.error(err);

	for (var i = 0; i < result.length; i++) {
		console.log('');
		console.log(result[i].name + ' ' + result[i].surname);
		console.log(result[i].city);
	};
});

connection.end();