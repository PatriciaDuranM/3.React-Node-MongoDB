const mongoose = require("mongoose");
const MovieScheme = mongoose.Schema(
  {
    title: String,
    year: Number,
    genre: String,
  },
  { collection: "movies" }
);

module.exports = MovieScheme;
