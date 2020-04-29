const express = require('express');
const router = express.Router();
const url = require('url');

let failedRequestsCount = 0;

module.exports = (server) => {

	// router.get('/users', (req, res, next) => {

	// 	if (!req.header('Authorization')) {
	// 		res.status(401).send('Unathorized!');
	// 	}

	// 	let usersDB = server.db.getState().users;

	// 	if (req.query['textFragment'] === 'error' && failedRequestsCount <= 3) {
	// 		failedRequestsCount++;
	// 		res.status('500').send('Something went wrong');
	// 	}

	// 	let users = req.query['textFragment'] ? usersDB.filter((user) => {
	// 		return user.name.toUpperCase().indexOf(req.query['textFragment'].toUpperCase()) >= 0;
	// 	}) : usersDB;

	// 	users = users.slice(0, req.query['count']);

	// 	res.json(users);
	// });

	router.get('/user/login/email', (req, res, next) => {
		let users = server.db.getState().users;
		let	matchedUser = users.find((user) => {
			return user.email === req.query.email;
		});

		if(!matchedUser) {
			res.status(401).send('User is not registered')
		} else if (matchedUser.pass === req.query.pass) {
			res.json({
				firstName: matchedUser.firstName,
				lastName: matchedUser.lastName,
				token: matchedUser.token,
				role: matchedUser.role
			});
		} else res.status(401).send('Wrong password')
	});

	router.get('/user/login/token', (req, res, next) => {
		let users = server.db.getState().users;
		let	matchedUser = users.find((user) => {
			return user.token === req.query.token;
		});

		if(matchedUser) {
			res.json({
				firstName: matchedUser.firstName,
				lastName: matchedUser.lastName,
				role: matchedUser.role
			});
		} else res.status(401).send('Should login')
	});

	return router;
};
