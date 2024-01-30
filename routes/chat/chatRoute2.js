const express = require("express");
const router = express.Router();
const chatController = require("../../controllers/chat/chatController2.js");
const auth = require("../../middleware/auth.js");


//view my
router.post("/view", chatController.getMessage);

//view my
router.post("/friends", chatController.getFriends);

// send message
router.post("/send", chatController.startChat);

// Expose the router and server for further use
module.exports = router;
