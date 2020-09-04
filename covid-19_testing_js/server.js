const express = require('express');
const apiRouter = require('./src/server/routes/index');
const path = require('path');
const app = express();

app.use('/api/covid_db', apiRouter);

app.use(express.json());
const port = 5000;

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || '5000', () => {
	console.log(`Server is running on port: ${process.env.PORT || '5000'}`);
});

app.get('/api/customers', (req, res) => {
	const customers = [
		{ id: 1, firstName: 'Juan', lastName: 'Orta' },
		{ id: 2, firstName: 'Mari', lastName: 'Payne' },
		{ id: 3, firstName: 'Israel', lastName: 'Orta' },
	];

	res.json(customers);
});
