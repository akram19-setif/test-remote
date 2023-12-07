const mongoose = require("mongoose");
//sector schema and model
const sectorSchema = new mongoose.Schema({
  value: Number,
  label: String,
  children: [{ value: Number, label: String }],
});

module.exports = mongoose.model("sector", sectorSchema);
