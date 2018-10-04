var mongoose = require("mongoose"); 
mongoose.connect("mongodb://localhost/blog_demo_2", {useNewUrlParser: true});


//post - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);


//user - email, name 
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

var User = mongoose.model("User", userSchema);

// Post.create({
//     title: "How to cook PART 3",
//     content: "blah bladsfsdfsdfdesfsdsdfh"
// }, function(err, post){
//         User.findOne({email: "bob@yahoo.com"}, function(err, foundUser){
//             if(err) {
//                 console.log(err);
//             } else {
//                 foundUser.posts.push(post);
//                 foundUser.save(function(err, data){
//                     if(err){
//                         console.log(err);
//                     } else {
//                         console.log(data);
//                     }
//                 });
//             } 
//         });

// });

// User.create({
//     email: "bob@yahoo.com",
//     name: "Bob bobs"
// });


//find user 
//find all posts for that user

User.findOne({email: "bob@yahoo.com"}).populate("posts").exec(function(err, user){
    if(err) {
        console.log(err);
    } else {
        console.log(user);
    }
});