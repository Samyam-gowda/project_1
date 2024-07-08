const mongoose = require("mongoose");
const User = require("./models/user.js");

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