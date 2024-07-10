const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/user.js");
const methodOverride = require("method-override");

app.set("views",path.join(__dirname,"views"));
// app.set("views","views");
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public"))); // for ataching css files from public folder
app.use(express.urlencoded({extended :true})); //for parsing the data from post request
app.use(methodOverride("_method"));


main()
.then((res) => {
    console.log("connection succesful");
})
.catch((err) => {
    console.log(err)
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/project_1');
};
let message = "";
app.get("/home" ,(req,res) => {
    res.render("home.ejs");
});
 //register route
 app.get("/home/register" ,(req,res) => {
    res.render("register.ejs");
 });

//register route
app.post("/home/reg", (req ,res) =>{
    let {username , email ,password} = req.body;
    let newUser = new User({
        username : username,
        email : email,
        password : password
    });

    newUser.save()
    .then( (res) => {
        console.log(res);
    }).catch ((err)  => {
        console.log(err);
    });

    res.redirect("/home/login");
});

//login route
app.get("/home/login" , (req,res) => {
    res.render("login.ejs",{message});
});

// login route
app.post("/home", async (req, res) => {
    let { username, password } = req.body;
    try {
      let details = await User.find({ username: username });
      console.log("Details:", details);
  
      if (details.length > 0) {
        let temp = details[0].username;
        let temp2 = details[0].password;
        console.log("Retrieved username:", temp);
  
        if (temp === username && temp2 === password) {
          console.log("Username and password matches. Working.");
          message = "";
          res.redirect("/home");
        } else {
          console.log("Username or password does not match. Not working.");
          message = "Username or password does not match! please try again";
          res.redirect("/home/login");
        }
      } else {
        console.log("No user found. Not working.");
        res.redirect("/home/login");
      }
    } catch (err) {
      console.log("Error:", err);
      res.redirect("/home/login");
    }
  });

app.listen(8080,(req,res) => {
    console.log("lisiting on port 8080");
});