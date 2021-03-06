/******************************************
Treehouse Techdegree:
FSJS project 8 - SQL Library Manager
--aiming for meets expectations--
******************************************/

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const routes = require('./routes/index');
const books = require('./routes/books');
const app = express();

// View engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware.
app.use('/static', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes.
app.use('/', routes);
app.use('/books', books);

// Catch 404 error and forward to global error handler.
app.use( (req, res, next) => {
	const err = new Error();
    err.status = 404;
    next(err);
});

// Error handler that renders an error or page-not-found page.
app.use( (err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	if (err.status === 404) {
		console.log('Global error handler called - Page Not Found');
		res.render('page-not-found', { err, title: 'Page Not Found' });
	} else {
		const err = new Error();
		err.status = 500;
		console.log('Global error handler called - Server Error');
		res.render('error', { err, title: 'Server Error' });
	}
});

module.exports = app;