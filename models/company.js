const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: { type: String, required: true },
  phone: Number,
  email: {type: String, unique: true, required: true, },
  password: {type: String, required: true, minlenght: [6, 'Password is to short']},
  adress: String,
  picture: String,
  rating: Number,
  discription: String,
  adSpaceInterested: [{
    type: Schema.Types.ObjectId,
    ref: "AdSpace"
  }],
  adSpaceUsed: [{
    type: Schema.Types.ObjectId,
    ref: "AdSpace"
  }]
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
