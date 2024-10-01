const express = require("express");
const { allUsers, login, logout, signup } = require("../controller/user.controller.js");
const secureRoute = require("../middleware/secureRoute.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers", secureRoute, allUsers);

module.exports = router;
