// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const path = require("path");
// const { User, Product } = require("./models/user"); 
// const methodOverride = require("method-override");
// let multer = require("multer");

// let storage = multer.diskStorage({
//   destination:'public/image',
//   filename : (req,file,cb) => {
//     cb(null,file.originalname);
//   }
// });

// let upload = multer({
//   storage : storage
// })

// app.set("views",path.join(__dirname,"views"));
// // app.set("views","views");
// app.set("view engine","ejs");
// app.use(express.static(path.join(__dirname,"public"))); // for ataching css files from public folder
// app.use(express.urlencoded({extended :true})); //for parsing the data from post request
// app.use(methodOverride("_method"));


// main()
// .then((res) => {
//     console.log("connection succesful");
// })
// .catch((err) => {
//     console.log(err)
// });

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/project_1');
// };
// let message = "";
// let globalName = "";

// app.get("/home" ,(req,res) => {
//     res.render("home.ejs",{globalName});
// });
//  //register route
//  app.get("/home/register" ,(req,res) => {
//     res.render("register.ejs");
//  });

// //register route
// app.post("/home/reg", (req ,res) =>{
//     let {username , email ,password} = req.body;
//     let newUser = new User({
//         username : username,
//         email : email,
//         password : password
//     });
//     console.log(newUser);
    
//     newUser.save()
//     .then( (res) => {
//         console.log(res);
//     }).catch ((err)  => {
//         console.log(err);
//     });

//     res.redirect("/home/login");
// });

// //login route
// app.get("/home/login" , (req,res) => {
//     res.render("login.ejs",{message});
// });

// // login route
// app.post("/home", async (req, res) => {
//     let { username, password } = req.body;
//     try {
//       let details = await User.find({ username: username });
//       console.log("Details:", details);
  
//       if (details.length > 0) {
//         let temp = details[0].username;
//         let temp2 = details[0].password;

//         console.log("Retrieved username:", temp);
        
//         globalName = details[0].username;
//         console.log(globalName);
//         if (temp === username && temp2 === password) {
//           console.log("Username and password matches. Working.");
//           message = "";
//           res.render("home.ejs",{globalName});
//         } else {
//           console.log("Username or password does not match. Not working.");
//           message = "Username or password does not match! please try again";
//           res.redirect("/home/login");
//         }
//       } else {
//         console.log("No user found. Not working.");
//         res.redirect("/home/login");
//       }
//     } catch (err) {
//       console.log("Error:", err);
//       res.redirect("/home/login");
//     }
//   });


// // adding photo 
// app.get("/home/addprod" ,(req,res) => {
//   res.render("addprod.ejs");
// })
// app.listen(8080,(req,res) => {
//     console.log("lisiting on port 8080");
// });

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const { User, Product } = require("./models/user"); 
const methodOverride = require("method-override");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: 'public/image',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose.connect('mongodb://127.0.0.1:27017/project_1')
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

let message = "";
let globalName = "";

app.get("/home", (req, res) => {
  res.render("home.ejs", { globalName });
});

// Register route
app.get("/home/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/home/reg", (req, res) => {
  let { username, email, password } = req.body;
  let newUser = new User({
    username: username,
    email: email,
    password: password
  });

  newUser.save()
    .then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });

  res.redirect("/home/login");
});

// Login route
app.get("/home/login", (req, res) => {
  res.render("login.ejs", { message });
});

app.post("/home", async (req, res) => {
  let { username, password } = req.body;
  try {
    let details = await User.find({ username: username });
    console.log("Details:", details);

    if (details.length > 0) {
      let temp = details[0].username;
      let temp2 = details[0].password;

      console.log("Retrieved username:", temp);

      globalName = details[0].username;
      console.log(globalName);
      if (temp === username && temp2 === password) {
        console.log("Username and password match. Working.");
        message = "";
        res.render("home.ejs", { globalName });
      } else {
        console.log("Username or password does not match. Not working.");
        message = "Username or password does not match! Please try again";
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

// Add product photo route
app.get("/home/addprod", (req, res) => {
  res.render("addprod.ejs");
});

// Handle file upload
app.post("/home/addprod", upload.single('photo'), (req, res) => {
  console.log(req.file); // To check if file info is being received
  let path = req.file.originalname;
  let {prodname , price , location , contact} = req.body;
  console.log(prodname,price,location,contact);

  let newprod = new Product({
    prodname : prodname,
    price :price,
    location : location,
    contact : contact,
    imglink : path
  });
  newprod.save()
  .then((res) =>{
    console.log(res);
    console.log("product added succesfully");
  }).catch((err) =>{
    console.log(err);
  });

  res.send("File uploaded successfully.");
});

app.get("/home/buyprod", async (req, res) => {
  try {
    let allProducts = await Product.find({});
    console.log(allProducts);
    res.render("buyprod.ejs", { allProducts });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving products");
  }
});


app.listen(8080, (req, res) => {
  console.log("Listening on port 8080");
});
