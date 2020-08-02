const mysql = require('mysql');

//connection to database
const pool = mysql.createPool({
	connectionLimit: 10,
	password: 'diegito1',
	user: 'root',
	database: 'covid19_test_sites',
	host: '127.0.0.1',
	port: 3306,
});

let sitesDB = {};

//queries
sitesDB.all = () => {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT * FROM test_sites`, (err, results) => {
			if (err) {
				return reject(err);
			}

			return resolve(results);
		});
	});
};

sitesDB.one = (id) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT * FROM test_sites WHERE id = ?`,
			[id],
			(err, results) => {
				if (err) {
					return reject(err);
				}

				return resolve(results);
			}
		);
	});
};

sitesDB.stateQuery = (state) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT * FROM test_sites WHERE state = ?`,
			[state],
			(err, results) => {
				if (err) {
					return reject(err);
				}
				//console.log('ok');
				return resolve(results);
			}
		);
	});
};

sitesDB.cityQuery = (city) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT * FROM test_sites WHERE city = ?`,
			[city],
			(err, results) => {
				if (err) {
					return reject(err);
				}
				//console.log('ok');
				return resolve(results);
			}
		);
	});
};

module.exports = sitesDB;
