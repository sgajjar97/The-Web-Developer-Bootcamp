var bodyParser = require("body-parser"),
mongoose       = require("mongoose"),
express        = require("express"),
app            = express();

//APP Config
mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

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

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs){
        if (err){
            console.log("ERROR");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!");
});

