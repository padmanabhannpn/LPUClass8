const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type:String,
        required:[true,"Name is required"],
        minlength:[3,"Name must be in atleast 3 Char"],
        maxlength:[50,"Name must be less than 50 Char"]
    }
    ,
    subject : String

});

const usermodel = mongoose.model('UserModel',userSchema,"userdata")


module.exports = usermodel;