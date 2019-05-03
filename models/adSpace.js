const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adSpaceSchema = new Schema({
  title: String,
  location: {type: String, required: true},
  description:{type: String, requied: true},
  validated: {type: Boolean, default: false},
  picture:[{type: String}],
  active: {type: Boolean, default: true},
  dateAdded: {
    type: Date,
    default: Date.now()
  }
});

const AdSpace = mongoose.model("AdSpace", adSpaceSchema);

module.exports = AdSpace;
