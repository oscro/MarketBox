const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adSpaceSchema = new Schema({
  location: {type: String, required: true},
  description:{type: String, requied: true},
  validated: {type: Boolean, default: false},
  time: String,
  picture:[{type: String}],
  available: {type: Boolean, default: false}
});

const AdSpace = mongoose.model("AdSpace", adSpaceSchema);

module.exports = AdSpace;
