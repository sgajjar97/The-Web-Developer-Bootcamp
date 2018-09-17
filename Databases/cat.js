var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

//adding a new cat to database
// var cat1 = new Cat({
//     name: "Nun",
//     age: 6,
//     temperament: "ghost"
// });

// cat1.save(function(err, cat){
//     if(err){
//         console.log("SOMETHING WENT WRONG");
//     } else {
//         console.log("WE JUST SAVED CAT TO DB:");
//         console.log(cat);
//     }
// });

Cat.create({
   name: "Shhh",
   age: 11,
   temperament: "nice"
}, function(err, cat){
    if(err){
        console.log("ERROR");
    } else {
        console.log(cat);
    }
});

//retrieve all cats from database and console.log each one
Cat.find({}, function(err, cats){
    if(err){
        console.log("OH NO, ERROR!");
        console.log(err);
    } else {
        console.log("ALL THE CATS...");
        console.log(cats);
    }
});
