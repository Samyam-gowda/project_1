const mongoose = require("mongoose");
const { User, Product } = require("./models/user"); 

let userList = [{
    username : "samyam",
    email : "samyamgowda2003@gmail.com",
    password: "samyam@123"
},
{
    username : "sugam",
    email : "sugamgowda2003@gmail.com",
    password: "sugam@123"

},
{
    username : "Aras",
    email : "Arasgowda2003@gmail.com",
    password: "Aras@123"
}
];


User.insertMany(userList);

let prodList = [
    {
    prodname :'potato',
    price :50,
    location :'Bangalore',
    contact :89456123,
    imglink :"temp.jpeg",
},
{
    prodname :'tomato',
    price :20,
    location :'Bangalore',
    contact :8945789626123,
    imglink :"temp.jpeg",
}

];
Product.insertMany(prodList);

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