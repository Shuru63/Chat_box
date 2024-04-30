const express=require(express);
const { getMessages, sendMessage }=require("../controller/Conversioncontoller")
const middleware = require("../middleware/middleware")
const router = express.Router();


router.route("/:id").get(middleware,getMessages);
router.route("/send/:id").post(sendMessage);

module.exportsrouter