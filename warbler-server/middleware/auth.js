require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require("express");

const testMiddleware = (req, res, next) => {
	try {
		console.log("Test middleware has been executed...")
	    next()
	} catch (err) {
	    console.error(err)
		next(err)
	}
}

const authenticateUser = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
			return (decoded ? next() : next({
				status: 401,
				message: "Please login first"
			}));
		});
	} catch (err) {
	    console.error(err);
	    return next({
		    status: 401,
		    message: "You are not logged in"
	    })
	}
};

const authorizeUser = (req, res, next) => {
	try {
	    const token = req.headers.authorization.split(" ")[1]
		jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
			return (decoded && decoded["id"] === req.params["userId"] ? next() : next({
				status: 401,
				message: "Unauthorized"
			}));
		})
	} catch (err) {
	    console.error(err)
		return next({
			status: 401,
			message: "Unauthorized"
		})
	}
};

module.exports = {
	testMiddleware,
	authenticateUser,
	authorizeUser
}
