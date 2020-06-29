const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema({
		text: {
			type: String,
			required: true,
			maxlength: 150
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},
	{
		timestamps: true
	}
);

messageSchema.pre("remove", async function (next) {
	try {
		//find a user
		let user = await User.findById(this.user)
		//remove the id of the message from the message list
		user.messages.remove(user.id)
		//save that user
		await user.save();
		//return next
		return next();
	} catch (err) {
		console.error(err)
		return next(err);
	}
})

const Message = mongoose.model("Message", messageSchema)

module.exports = Message;