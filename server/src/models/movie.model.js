const mongoose = require("mongoose");
const MovieScheme = require("../schemes/movies.scheme");

const MovieModel = mongoose.model("Movie", MovieScheme);

module.exports = MovieModel;
