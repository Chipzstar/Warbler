const db = require('../models/index');

//POST - /api/users/:user_id/messages/:message_id
exports.createMessage = async function (req, res, next) {
	console.log(req.params);
	let {userId} = req.params;
	let {text} = req.body;
	try {
		let message = await db.Message.create({
			text,
			user: userId
		});
		let foundUser = await db.User.findById(userId);
		foundUser.messages.push(message.id);
		await foundUser.save();
		let createdMessage = await db.Message.findById(message._id).populate("user", {
			username: true,
			profileImageURL: true
		});
		return res.status(200).json({
			createdMessage
		})
	} catch (err) {
		console.error(err)
		return next(err);
	}
}

//GET - /api/users/:user_id/messages/:message_id
exports.getMessage = async function (req, res, next) {
	let {userId, msgId} = req.params;
	console.log(req.params)
	try {
		let currentUser = await db.User.findById(userId);
		console.log(currentUser)
		let foundMessage = await db.Message.findById(
			currentUser.messages.find(id => {
				return Object.is(id.toString(), msgId.toString());
			}))
		return res.status(200).json({
			foundMessage
		})
	} catch (err) {
		console.error(err)
		return next(err);
	}
}

//DELETE - /api/users/:user_id/messages/:message_id
exports.deleteMessage = async function (req, res, next) {
	let { msgId } = req.params;
	console.log(req.params)
	try {
	    let foundMessage = await db.Message.findById(msgId)
		await foundMessage.remove()
		return res.status(200).json({
			foundMessage,
			status: "MESSAGE DELETED"
		});
	} catch (err) {
	    console.error(err)
		return next(err)
	}
}