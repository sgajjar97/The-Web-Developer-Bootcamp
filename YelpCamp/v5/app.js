var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();


// var campgrounds = [
//             {name: "Salmon Creek", image: "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&h=350"},
//             {name: "Granite Hill", image: "https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&h=350"},
//             {name: "Salmon Creek", image: "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&h=350"},
//             {name: "Granite Hill", image: "https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&h=350"},
//             {name: "Salmon Creek", image: "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&h=350"},
//             {name: "Granite Hill", image: "https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&h=350"},
//             {name: "Red Rock", image: "https://s.hswstatic.com/gif/landscape-photography-1.jpg"}
//         ]

app.get("/", function(req, res){
    res.render("landing"); 
});

//INDEX route - show all campgrounds
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE route - add new campground to db
app.post("/campgrounds", function(req, res){
   //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description: desc};
   //Creat a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if (err) {
           console.log(err);
       } else {
        //redirect back to campgrounds page
           res.redirect("/campgrounds");
       }
   });
});


//NEW route - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
   res.render("campgrounds/new"); 
});

//SHOW route - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
    
    //render show template with that campground
   //res.render("show"); 
});

//  ==================
//  COMMENTS ROUTES
//  ==================

app.get("/campgrounds/:id/comments/new", function(req, res) {
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           res.render("comments/new", {campground: campground}); 
       }
   });
});

app.post("/campgrounds/:id/comments", function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server started!");
});