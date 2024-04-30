const express = require("express")
const app = express();
const cookiesparser = require("cookie-parser")
app.use(express.json());
app.use(cookiesparser());
const middleware = require("../Backend/middleware/middleware")
// router
const Auth = require("../Backend/Route/authRoute");
const message = require("../Backend/Route/authRoute");
const user = require("../Backend/Route/authRoute");
app.use("/chatkaro", Auth);
app.use("/chatkaro", message);
app.use("/chatkaro", user);
app.use(middleware);
module.exports = app;