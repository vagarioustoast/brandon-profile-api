const mongoose = require("mongoose");
Schema = mongoose.Schema;

const ShowSchema = new Schema({
  title: String,
  seasons: Number
});

const Show = mongoose.model("Show", ShowSchema);

module.exports = Show;
