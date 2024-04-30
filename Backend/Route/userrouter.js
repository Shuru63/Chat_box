const express = require('express'); 
const getUsersForSidebar = require("../controller/usercontroler");
const middleware = require("../middleware/middleware");
const router = express.Router();

router.route("/get").get(middleware,getUsersForSidebar); 

module.exports = router;
