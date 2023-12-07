const mongoose = require("mongoose");
// Shema for data User
const userDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sector: { type: String, required: true },
  agree: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("userData", userDataSchema);
