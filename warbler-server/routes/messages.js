const express = require("express");
const router = express.Router({ mergeParams: true })

const { createMessage, getMessage, deleteMessage, updateMessage } = require('../helpers/messages')

//prefix - /api/users/id/messages
router.route("/").post(createMessage)

//prefix - /api/users/id/messages/messageId
router.route("/:msgId").get(getMessage)
router.route("/:msgId").put(updateMessage)
router.route("/:msgId").delete(deleteMessage)

module.exports = router;
