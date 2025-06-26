const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: String,
    subject : String

});

const usermodel = mongoose.model('UserModel',userSchema,"userdata")


module.exports = usermodel;