const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoose.pluralize(null);

const adminSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
