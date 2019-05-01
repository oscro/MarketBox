const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const providerSchema = new Schema({
  phone: Number,
  address: String,
  picture: String,
  rating: Number,
  paid: { type: Boolean, default: false },
  adSpace: [{
    type: Schema.Types.ObjectId,
    ref: "AdSpace"
  }]
});

const Provider = mongoose.model("Provider", providerSchema);

module.exports = Provider;
