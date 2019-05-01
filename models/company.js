const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: { type: String, required: true },
  phone: Number,
  address: String,
  picture: String,
  rating: Number,
  discription: String,
  paid: { type: Boolean, default: false },
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
