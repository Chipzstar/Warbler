const mongoose = require('mongoose')

mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/warbler", {
	keepAlive: true,
	useCreateIndex: true,
	useFindAndModify: false
}, () => console.log("Connected to Mongo Database!"))

module.exports.User = require("./user");
module.exports.Message = require("./message");