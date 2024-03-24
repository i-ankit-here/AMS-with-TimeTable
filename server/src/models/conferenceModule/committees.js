const mongoose = require("mongoose");

// Define your Mongoose schema based on the interface
const committeeSchema = new mongoose.Schema({
  ConfId: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
  },
  Subtype: {
    type: String,
  },
  Name: {
    type: String,
  },
  Designation: {
    type: String,
  },
  Institute: {
    type: String,
  },
  ProfileLink: {
    type: String,
  },
  ImgLink: {
    type: String,
  },
  sequence: {
    type: Number,
  },
  feature: {
    type: Boolean,
  },
});

// Create the Mongoose model
const Committee = mongoose.model("cf-committee", committeeSchema);

module.exports = Committee;
