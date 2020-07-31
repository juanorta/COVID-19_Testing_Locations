const mysql = require('mysql');

const pool = mysql.createPool({
	connectionLimit: 10,
	password: 'diegito1',
	user: 'root',
	database: 'covid19_test_sites',
	host: '127.0.0.1',
	port: 3306,
});

let sitesDB = {};

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

module.exports = sitesDB;
