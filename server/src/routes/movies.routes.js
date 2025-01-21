const express = require("express");
const moviesController = require("../controllers/movies.controller");
const moviesRoutes = express.Router();

moviesRoutes.get("/", moviesController.getAllMovies);
moviesRoutes.get("/:id", moviesController.getMovieById);
moviesRoutes.get("/genre/:genre", moviesController.getMovieByGenre);
moviesRoutes.get("/year/:year", moviesController.getMovieByYear);
moviesRoutes.get(
  "/year-range/:yearStart/:yearEnd",
  moviesController.getMovieByRangeYear
);
moviesRoutes.post("/", moviesController.createMovie);
moviesRoutes.patch("/:id", moviesController.updateMovie);
moviesRoutes.delete("/:id", moviesController.deleteMovie);

module.exports = moviesRoutes;

// const usersController = require("../controllers/users.controller");

// /*LEER*/
// usersRoutes.get("/", usersController.getAllUsers);

// /*encontrar usuario por id*/
// usersRoutes.get("/:id", usersController.getUserById);

// /*CREAR*/
// usersRoutes.post("/", usersController.createNewUser);

// /* ACTUALIZAR los datos con PATCH*/
// usersRoutes.patch("/:id", usersController.updateUsers);

// /*BORRAR*/
// usersRoutes.delete("/:id", usersController.deleteUser);

// /*exportacion de las rutas*/
// module.exports = usersRoutes;
