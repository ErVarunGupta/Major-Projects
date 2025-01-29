const Listing = require('../models/listing.js');

module.exports.index = async(req, res)=>{
    // Listing.find({})
    // .then((res)=>{console.log(res)})
    // .catch((err)=>{console.log(err)});

    let allListings = await Listing.find({});
    // console.log(allListings);
    res.render("listings/index .ejs",{allListings});
}

// New route
module.exports.renderNewForm = (req, res)=>{
    // console.log(req.user)
    res.render("listings/new.ejs");
};

//Create route
module.exports.createNewListing = async (req, res, next)=>{
    // let {title, description, image, price, country, location} = req.body;
    // let listing = req.body.listing;
    // console.log(listing);
    // let newInfo = new Listing({
    //     title: title,
    //     description: description,
    //     image: image,
    //     price: price,
    //     country: country,
    //     location: location,
    // })

    // if(!req.body.listing){
    //     throw new ExpressError(400, "Send valid data for listing");
    // }

    // let newInfo = new Listing(req.body.listing);
    // if(!newInfo.title){
    //     throw new ExpressError(400, "Title is missing!")
    // }
    // if(!newInfo.description){
    //     throw new ExpressError(400, "Description is missing!")
    // }
    // if(!newInfo.location){
    //     throw new ExpressError(400, "Location is missing!")
    // }

    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url,"---",filename);
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
}


// show route
module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id)
    .populate({path:"reviews", populate: {path: "author",}})
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs",{listing});
}

//edit route
module.exports.renderEditForm = async(req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/h_200,w_300");
    res.render("listings/edit.ejs",{listing, originalImageUrl});
}

//update route
module.exports.updateListing = async(req, res)=>{
    let {id} = req.params;
    // let newListing = req.body.listing;
    // await Listing.findByIdAndUpdate(id, newListing);
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }

    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}

//delete route
module.exports.deleteListing = async(req, res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    req.flash("success","Listing Deleted!")
    res.redirect("/listings");
}