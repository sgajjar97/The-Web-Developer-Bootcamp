var mongoose = require("mongoose"); 
mongoose.connect("mongodb://localhost/blog_demo", {useNewUrlParser: true});


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
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);


// var newUser = new User({
//     email: "bye@gmail.com",
//     name: "Bye"
// });

// newUser.posts.push({
//     title: "How to posts",
//     content: "dfkdsjnfjnkvndn;jnsdnfivnd;jn"
// });

// newUser.save(function(err, user){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user); 
//     }
// });


// var newPost = new Post({
//     title: "HELLO WORLD",
//     content: "testing data association"
// });
// newPost.save(function(err, post){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(post); 
//     }
// });


User.findOne({name: "Bye"}, function(err, user){
    if(err){
        // console.log(err);
    } else {
        user.posts.push({
            title: "xxxxxxxxxxxx",
            content: "HATE SOMETHING"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});