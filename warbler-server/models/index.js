const mongoose = require('mongoose')

mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost:27017/warbler", {
	keepAlive: true,
	useCreateIndex: true
}, () => console.log("Connected to Mongo Database!"))

module.exports.User = require("./user");
module.exports.Message = require("./message");