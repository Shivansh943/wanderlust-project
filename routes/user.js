const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { signup } = require("../controllers/users.js");

const userController = require("../controllers/users.js");

router.get("/auth", userController.renderAuth);

// router.get("/signup",(req,res)=>{
//     res.render("users/signup.ejs");
// });

router.post("/signup",wrapAsync(userController.signup));

// router.get("/login",(req,res)=>{
//     res.render("users/login.ejs");
// });

router.post("/login", saveRedirectUrl, passport.authenticate("local", {failureRedirect: '/auth', failureFlash: true}), userController.login );

router.get("/logout", userController.logOut);

module.exports = router;