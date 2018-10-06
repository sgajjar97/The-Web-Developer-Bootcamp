var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Tahoe",
        image: "https://images.unsplash.com/photo-1452019761881-737a0073d2f7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=858a2bcb84a22351a65d01231481860f&auto=format&fit=crop&w=2104&q=80",
        description: "Snowy place"
    },
    {
        name: "Yosemite",
        image: "https://images.unsplash.com/photo-1516687401797-25297ff1462c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0594bece8da8091bab780d2e1b1e26b5&auto=format&fit=crop&w=2100&q=80",
        description: "Mountains"
    },
    {
        name: "Crater Lake",
        image: "https://images.unsplash.com/photo-1533229509385-807924881374?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ca173746b34758e6c808a2e22db5f615&auto=format&fit=crop&w=2100&q=80",
        description: "Blue lake"
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if (err){
            console.log(err); 
        }
        console.log("removed campgrounds...");
        //Add few campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else {
                console.log("Added a campground");
                //Create a comment
                Comment.create(
                    {
                        text: "This place is great, but there is no WiFi", 
                        author: "BOBs"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                        }
                       console.log("Created new comment");
                    });
            }
        });
    });
    });
    
    
    
    //Add few comments
    
}

module.exports = seedDB;

