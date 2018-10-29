var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");


//INDEX route - show all campgrounds
router.get("/", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

//CREATE route - add new campground to db
router.post("/", isLoggedIn, function(req, res){
   //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username  
   }
   var newCampground = {name: name, image: image, description: desc, author: author};
   
   //Creat a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if (err) {
           console.log(err);
       } else {
        //redirect back to campgrounds page
        console.log(newlyCreated);
           res.redirect("/campgrounds");
       }
   });
});


//NEW route - show form to create new campground
router.get("/new", isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});

//SHOW route - shows more info about one campground
router.get("/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           //render show template with that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

//Edit Campground Route 
router.get("/:id/edit", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//Update Campground Route
router.put("/:id", function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;