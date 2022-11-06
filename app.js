const express = require("express")
const ejs = require("ejs")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/contentDB", { useNewUrlParser: true });

const BlogSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model("Blog", BlogSchema);

app.get("/", (req, res) => {
    Post.find({}, (err, posts) => {
        res.render("home", {
            startingContent: homeStartingContent,
            posts: posts
        });
    });
});

app.get("/compose", (req, res) => {
    res.render("compose");
})
app.post("/post", (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save((err) => {
        if (!err) {
            res.render("/");
        }
    })
    res.redirect('/');
})


app.listen(3000, (req, res) => {
    console.log("Server running  on port on 3000");
})