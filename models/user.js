const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: Number,
  email: {type: String, unique: true, required: true, },
  password: {type: String, required: true, minlenght: [6, 'Password is to short']},
  address: String,
  picture: String,
  rating: Number,
  adSpace: [{
    type: Schema.Types.ObjectId,
    ref: "AdSpace"
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
