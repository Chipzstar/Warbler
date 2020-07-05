require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const errorHandler = require('./helpers/error');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const { authorizeUser, authenticateUser } = require('./middleware/auth');

const db = require('./models/index');
const PORT = process.env.PORT || 8081;

app.use(cors())
app.use(bodyParser.json())

app.get('/api', (req, res) => {
	res.status(200).json({
		message: "Welcome to Warbler"
	})
})

app.use('/api/auth', authRoutes);
app.use(
	"/api/users/:userId/messages",
	authenticateUser,
	authorizeUser,
	messagesRoutes
);

app.get("/api/messages", authenticateUser, async function (req, res, next) {
	try {
	    let messages = await db.Message.find()
		    .sort({createdAt: "desc"})
		    .populate("user", {
		    	username: true,
			    profileImageURL: true
		    });
	    return res.status(200).json(messages)
	} catch (err) {
	    console.error(err)
		return next(err)
	}
})

//routes
app.use((req, res, next) => {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
})

app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`)
});