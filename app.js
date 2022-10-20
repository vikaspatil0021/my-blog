const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const _ = require("lodash");


const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://my-blog:8431blog@cluster0.mtbnhxs.mongodb.net/myblogDB",{useNewUrlParser:true});
const postSchema = {
  _id:String,
  postContent:String
}
const Post = mongoose.model("post",postSchema);


app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");




app.get("/about",(req,res)=>{
  let content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  res.render("index",{content:content,head:"About Us",url:"/about"})
})

app.get("/contact",(req,res)=>{
  let content = "printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a pieceLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown  of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10., comes from a line in section 1.10.32"
  res.render("index",{content:content,head:"Contact Us",url:"/contact"})
})

app.get("/",(req,res)=>{
  let content = "Curabitur blandit tempus porttitor. SupportStack OverflowAsk questions about specific problems you have faced, including details about what exactly you are trying to do. Make sure you tag your question with ejs. You can also read through existing ejs questions.GitHub issuesThe issue tracker is the preferred channel for bug reports, features requests and submitting pull requests.Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.Multiple lines of text that form the lede, informing new readers quickly and efficiently about whats most interesting in this posts contents."

  Post.find(function(err,foundObj){
    res.render("index",{content:content,head:"Home",url:"/",list:foundObj})
  })
})

app.get("/compose",(req,res)=>{
  res.render("index",{head:"Compose",url:"compose"})
})

app.get("/posts/:post",(req,res)=>{
  let url = _.capitalize(req.params.post)

  Post.findOne({_id:url},function(err,foundObj){
    if(foundObj){
      res.render("index",{content:foundObj.postContent, head:foundObj._id, url:url})
    }else{
      res.send("<h1>There is no post with that url</h1><a role='button' href='/'>Back to go HOME</a>")
    }

  })


})

app.post("/compose",(req,res)=>{
  let nwPostName = _.capitalize(req.body.postName);
  let nwPostContent = req.body.postContent;

  Post.findOne({_id:nwPostName},function(err,fObj){
    if(!fObj){
      const post = new Post({
        _id:nwPostName,
        postContent:nwPostContent
      })
      post.save()
      res.redirect("/")

    }else{
      console.log("error");
      res.send("<h1>Please use a unique Title for your post</h1><a role='button' href='/compose'>Back to create NEW POST</a>")

    }

  })

})

app.listen(process.env.PORT || 3000,() => {
  console.log("Server has started.");
})
