const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');

const userController = require('../controllers/users.js');

router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.login
);

//Logout route
router.get("/logout",userController.logout);

module.exports = router;

// ============================================

//reder signup form
// router.get("/signup", userController.renderSignupForm);

//signup route
// router.post("/signup", wrapAsync(userController.signup));

// Login route
// router.get("/login", userController.renderLoginForm);

 //if user is not authenticate the flash message is show
//  router.post(
//     "/login",
//     saveRedirectUrl,
//     passport.authenticate("local", {
//         failureRedirect: "/login",
//         failureFlash: true,
//     }),
//     userController.login
// );


//==> go to controller folder to get all functionality