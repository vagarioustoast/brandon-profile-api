const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/personal-api",
  { useMongoClient: true }
);

module.exports = {
  Book: require("./book"),
  Show: require("./show")
};
