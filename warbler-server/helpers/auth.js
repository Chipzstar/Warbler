const db = require("../models/index")
const jwt = require("jsonwebtoken");
const path = require('path');

exports.login = async (req, res, next) => {
	try {
		let user = await db.User.findOne({
			email: req.body.email
		})
		let {_id, username, profileImageURL} = user
		let isMatch = await user.comparePassword(req.body.password);
		if (isMatch) {
			let token = jwt.sign({
					_id,
					username,
					profileImageURL
				},
				process.env.SECRET_KEY
			);
			return res.status(200).json({
				id: _id, username, profileImageURL, token,
				message: "You have logged in Successfully!"
			})
		} else {
			return next({
				status: 400,
				message: "Invalid Email/Password"
			})
		}
	} catch (err) {
		console.error(err)
		return next({
			status: 400,
			message: "Invalid Email/Password"
		})
	}
}

exports.register = async (req, res, next) => {
	console.log("req.file:", req.file);
	try {
		//create a user
		let user = await db.User.create(req.file ? {...req.body, profileImageURL: req.file.path} : {...req.body})
		let {id, username, profileImageURL} = user
		//create a jwt token
		let token = jwt.sign({
				id,
				username,
				profileImageURL
			},
			process.env.SECRET_KEY
		);
		return res.status(201).json({
			id,
			username,
			profileImageURL,
			token
		})
	} catch (err) {
		//if validation fails!
		if (err.code === 11000) {
			err.message = "Sorry, that username and/or email is taken!"
		}
		console.error(err)
		return next({
			status: 400,
			message: err.message
		})
	}
}