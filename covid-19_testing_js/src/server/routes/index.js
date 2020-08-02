const express = require('express');
const router = express.Router();
const db = require('../db');

let visited = false;
//router.use(express);

//what gets appended at the end of /api/covid_db
router.get('/', async (req, res) => {
	try {
		console.log('all route called');
		let results = await db.all();

		return res.json(results);
	} catch (e) {
		console.log(e);
		return res.sendStatus(500);
	}
});

router.get('/state/:state', async (req, res) => {
	try {
		let results = await db.stateQuery(req.params.state);
		//return res.status(200).json(results);

		return res.json(results);
	} catch (e) {
		return res.sendStatus(500);
	}
});

router.get('/id/:id', async (req, res) => {
	try {
		let results = await db.one(req.params.id);
		//res.status(200).json(results);
		//res.status(200);
		console.log('id called');
		return res.json(results);
	} catch (e) {
		return res.sendStatus(500);
	}
});

router.get('/city/:city', async (req, res) => {
	try {
		let results = await db.cityQuery(req.params.city);
		//res.status(200).json(results);
		//res.status(200);
		return res.json(results);
	} catch (e) {
		return res.sendStatus(500);
	}
});
module.exports = router;
