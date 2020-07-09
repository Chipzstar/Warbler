require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require("express");

const authenticateUser = async (req, res, next) => {
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

const authorizeUser = async (req, res, next) => {
	try {
	    const token = req.headers.authorization.split(" ")[1]
		jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
			return (decoded && decoded["_id"] === req.params["userId"] ? next() : next({
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
	authenticateUser,
	authorizeUser
}
