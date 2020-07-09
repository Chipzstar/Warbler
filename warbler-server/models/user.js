const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	profileImageURL: {
		type: String,
		default: ''
	},
	messages: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message"
		}
	]
});

userSchema.pre("save", async function(next) {
	try {
		if(!this.isModified("password")){
			return next();
		}
		this.password = await bcrypt.hash(this.password, 10);
		return next();
	} catch(err) {
		return next(err);
	}
})

userSchema.methods.comparePassword = async function(candidatePassword, next) {
	try {
	    return await bcrypt.compare(candidatePassword, this.password);
	} catch (err) {
	    console.error(err)
		return next(err);
	}
}

const User = mongoose.model("User", userSchema);

module.exports = User;