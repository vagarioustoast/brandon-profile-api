const mongoose = require("mongoose");
const Book = require("./book");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/personal-api",
  { useMongoClient: true }
);

module.exports = {
  Book: Book
};
