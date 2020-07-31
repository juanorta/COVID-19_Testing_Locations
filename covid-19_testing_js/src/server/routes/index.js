const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
	try {
		let results = await db.all();
		res.json(results);
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
});

module.exports = router;
