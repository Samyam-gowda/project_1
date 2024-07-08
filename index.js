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

app.get("/home" ,(req,res) => {
    res.render("home.ejs");
});
 //register route
 app.get("/home/:register" ,(req,res) => {
    res.render("register.ejs");
 });

//register route
app.post("/home", (req ,res) =>{
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

    res.redirect("/home");
});

app.listen(8080,(req,res) => {
    console.log("lisiting on port 8080");
});