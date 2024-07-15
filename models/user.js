const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true
    },
    email :{
        type : String,
        // required : true
    },
    password :{
        type : String,
        require : true

    }
});

const prodSchema = new mongoose.Schema({
    prodname :{
        type: String,
        required : true
    },
    price :{
        type : Number,
        required : true
    },
    location :{
        type : String
    },
    contact :{
        type :Number
    },
    imglink : {
        type : String
    }

});
const cartSchema = new mongoose.Schema({
    prodname :{
        type: String,
        required : true
    },
    price :{
        type : Number,
        required : true
    },
    location :{
        type : String
    },
    contact :{
        type :Number
    },
    imglink : {
        type : String
    }
});
const Product = mongoose.model("Product",prodSchema);

const Cart = mongoose.model("Cart",cartSchema);
const User = mongoose.model("User",userSchema);

module.exports = {
    User,Product,Cart
};