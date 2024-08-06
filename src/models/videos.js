const mongoose = require('mongoose')

const videosSchema = new mongoose.Schema({
    category : {
        type : String,
        required : [true, 'Course Category is required'],
        // match : /^[a-zA-Z ]{2,20}$/
    },
    topic : {
        type : String,
        required : [true, 'Course Topic is required'],
        match : /^[a-zA-Z ]{2,50}$/
    },
    link : {
        type : String,
        required : [true, 'Course Price is required'],
        // match : /^[a-zA-Z/:0-9?=_%$&-.]{1,15}$/
    },
    status : {
        type: Boolean,
        default : true
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

const courseModel = mongoose.model('videos',videosSchema);

module.exports = courseModel;