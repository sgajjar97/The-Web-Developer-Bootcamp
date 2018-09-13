var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
            {name: "Salmon Creek", image: "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&h=350"},
            {name: "Granite Hill", image: "https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&h=350"},
            {name: "Salmon Creek", image: "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&h=350"},
            {name: "Granite Hill", image: "https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&h=350"},
            {name: "Salmon Creek", image: "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&h=350"},
            {name: "Granite Hill", image: "https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&h=350"},
            {name: "Red Rock", image: "https://s.hswstatic.com/gif/landscape-photography-1.jpg"}
        ]

app.get("/", function(req, res){
    res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
   //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground);
   
   //redirect back to campgrounds page
   res.redirect("/campgrounds");
});


app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server started!");
});