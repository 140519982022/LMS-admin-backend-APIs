const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name Is Required'],
    },
    email : {
        type : String,
        required : [true, 'Email Is Required'],
        // match : /^[a-zA-Z ]{8,30}$/
    },
    mobile_number : {
        type : String,
        required : [true, 'Mobile Number Is Required'],
        // match : /^[a-zA-Z/:0-9?=_%$&-.]{1,15}$/
    },
    password : {
        type: String,
        required : [true, 'Password Is Required'],

    },
   
    created_at : {
        type: Date,
        default : Date.now
    },
    updated_at : {
        type: Date,
        default : Date.now
    },
    deleted_at : {
        type: Date,
        default : ''
    }
})

const usersModel = mongoose.model('users',usersSchema);

module.exports = usersModel;