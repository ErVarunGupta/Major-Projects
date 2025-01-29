const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require('../middleware.js');

const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
// const upload = multer({dest: 'uploads/'})


router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,upload.single('listing[image]'),validateListing, wrapAsync(listingController.createNewListing));
    // .post(upload.single('listing[image]'),(req, res)=>{
    //     res.send(req.file)
    // })

//New route
router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get( wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner,upload.single('listing[image]'), validateListing,wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.deleteListing));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;

// ==============================================================

//Index route
// router.get("/",wrapAsync(listingController.index));

//Create route
// router.post("/",isLoggedIn,validateListing, wrapAsync(listingController.createNewListing))

//show route
// router.get("/:id", wrapAsync(listingController.showListing));

//Update route
// router.put("/:id",isLoggedIn, isOwner, validateListing,wrapAsync(listingController.updateListing))

//Delete route
// router.delete("/:id",isLoggedIn,isOwner, wrapAsync(listingController.deleteListing))


//==> go to controller folder to get all functionality