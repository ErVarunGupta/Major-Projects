const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
    email:{
        type: String,
        required: true,
    }
    //password automatically defined by passport-local-mongoose
})

userSchema.plugin(passportLocalMongoose);
//username, hashing, salting, password automatically add

module.exports = mongoose.model('User',userSchema);