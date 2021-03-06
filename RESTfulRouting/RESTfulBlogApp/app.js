var bodyParser   = require("body-parser"),
methodOverride   = require("method-override"),
expressSanitizer = require("express-sanitizer"),
mongoose         = require("mongoose"),
express          = require("express"),
app              = express();

//APP Config
mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//MONGOOSE/Model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1537726043141-dabf1c48d0a8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2a4c5c3eddd45aa044607c69e46f24bb&auto=format&fit=crop&w=934&q=80",
//     body: "Beautiful views at the beach"
// });

//RESTful Routes

app.get("/", function(req, res) {
   res.redirect("/blogs"); 
});

//INDEX route
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs){
        if (err){
            console.log("ERROR");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

//NEW route
app.get("/blogs/new", function(req, res) {
   res.render("new"); 
});

//CREATE route
app.post("/blogs", function(req, res) {
  //create blog
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, function(err, newBlog){
     if (err){
         res.render("new");
     } else {
         //redirect to index
         res.redirect("/blogs");
     }
  });
});

//SHOW route
app.get("/blogs/:id", function(req, res) {
   Blog.findById(req.params.id, function(err, foundBlog){
       if (err){
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: foundBlog});
       }
   }); 
});

//EDIT route
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

//UPDATE route
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if (err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE route
app.delete("/blogs/:id", function(req, res) {
   //destroy blog
   Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
   });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!");
});

