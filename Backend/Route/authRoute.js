const express=require("express");
const {  Signup,
    Login,
    logout}=require("../controller/authcontroller");


    const router=express.Router();
    router.route("/signup").post(Signup);
    router.route("/login").post(Login);
    router.route("/logout").post(logout);

module.exports=router;
