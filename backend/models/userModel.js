const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

  
    name: {
        type: String,
        required: [true,"Please enter your name"],
        trim:true
    },

    email: {
        type: String,
        required: [true,"Please enter your email"],
        trim:true
    },
    password: {
        type: String,
        required: [true,"Please enter a password"]
    },

    avatar: {
        type: String,
        default:"https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    },

    about: {
        type: String,
        default:""
    }

},{
    timestamps : true
})

 
module.exports = mongoose.model("Users", userSchema);
