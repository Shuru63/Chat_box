const express = require("express");
const { getMessage, sendMessage, handleTranslateMessage } = require("../controller/message.controller.js");
const secureRoute = require("../middleware/secureRoute.js");


const router = express.Router();
router.post("/send/:id", secureRoute, sendMessage);
router.get("/get/:id", secureRoute, getMessage);
router.post("/translater/:id",secureRoute, handleTranslateMessage);

module.exports =  router;
