const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname : String,
    email: String,
    password: String,
    mobno: String,
    dob: String,
    address: String
},
{
    timestamps: true
})

exports.userModel = mongoose.model('library_users', userSchema)