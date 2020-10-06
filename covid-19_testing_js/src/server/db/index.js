const mysql = require('mysql');
require('dotenv').config();

console.log(process.env);

//connection to database
const pool = mysql.createPool({
	connectionLimit: process.env.REACT_APP_DB_CONNECTION_LIMIT,
	password: process.env.REACT_APP_DB_PASS,
	user: process.env.REACT_APP_DB_USER,
	database: process.env.REACT_APP_DB,
	host: process.env.REACT_APP_DB_HOST,
	port: process.env.REACT_APP_DB_PORT,
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

// sitesDB.stateQuery = (state) => {
// 	return new Promise((resolve, reject) => {
// 		pool.query(
// 			`SELECT * FROM test_sites WHERE state = ?`,
// 			[state],
// 			(err, results) => {
// 				if (err) {
// 					return reject(err);
// 				}
// 				//console.log('ok');
// 				return resolve(results);
// 			}
// 		);
// 	});
// };

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

sitesDB.addressQuery = (address) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT * FROM test_sites WHERE address = ?`,
			[address],
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

sitesDB.cityStateQuery = (city, state) => {
	return new Promise((resolve, reject) => {
		pool.query(
			`SELECT * FROM test_sites WHERE city = ? AND state = ?`,
			[city, state],
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

sitesDB.userLocationQuery = (locationAccess, city, lat, lng, radius, state) => {
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

module.exports = sitesDB;
