const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
