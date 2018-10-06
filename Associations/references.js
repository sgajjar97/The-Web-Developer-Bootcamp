var mongoose = require("mongoose"); 
mongoose.connect("mongodb://localhost/blog_demo_2", {useNewUrlParser: true});

var Post = require("./models/posts");

var User = require("./models/user"); 

Post.create({
    title: "How to cookkk PART 4",
    content: "bsdfsd sdf sd fsfsdfsdfdesfsdsdfh"
}, function(err, post){
        User.findOne({email: "bob@yahoo.com"}, function(err, foundUser){
            if(err) {
                console.log(err);
            } else {
                foundUser.posts.push(post);
                foundUser.save(function(err, data){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                });
            } 
        });

});

// User.create({
//     email: "bob@yahoo.com",
//     name: "Bob bobs"
// });


//find user 
//find all posts for that user

// User.findOne({email: "bob@yahoo.com"}).populate("posts").exec(function(err, user){
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });