const MovieModel = require("../models/movie.model");

const moviesController = {};

moviesController.getAllMovies = async (req, res) => {
  try {
    const allMovies = await MovieModel.find();
    return res.status(200).json(allMovies);
  } catch (error) {
    return res.status(500).json({ error: "Error reading database" + error });
  }
};

moviesController.getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await MovieModel.findById(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ error: "Error reading database" + error });
  }
};

moviesController.createMovie = async (req, res) => {
  const movieInfo = req.body;
  const newMovies = new MovieModel({ ...movieInfo });
  try {
    await newMovies.save();
    const allMovies = await MovieModel.find();
    return res.status(200).json(allMovies);
  } catch (error) {
    return res.status(500).json({ error: "Error reading database" + error });
  }
};

moviesController.updateMovie = async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  try {
    const movieToUpdate = await MovieModel.findById(id);
    if (!movieToUpdate) {
      return res.status(404).json({ error: "Movie not found" });
    }
    await MovieModel.updateOne({ _id: id }, { $set: { ...newInfo } });
    const allMovies = await MovieModel.find();
    return res.status(200).json(allMovies);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error reading/write database" + error });
  }
};

moviesController.deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movieToUpdate = await MovieModel.findById(id);
    if (!movieToUpdate) {
      return res.status(404).json({ error: "Movie not found" });
    }
    await MovieModel.deleteOne({ _id: id });
    const allMovies = await MovieModel.find();
    return res.status(200).json(allMovies);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error reading/write database" + error });
  }
};

moviesController.getMovieByGenre = async (req, res) => {
  const { genre } = req.params;
  try {
    const movies = await MovieModel.find({
      genre: { $eq: genre },
    });
    if (!movies) {
      return res.status(200).json([]);
    }
    return res.status(200).json(movies);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error reading/write database" + error });
  }
};

moviesController.getMovieByYear = async (req, res) => {
  const { year } = req.params;
  try {
    const movies = await MovieModel.find({
      year: { $gte: year },
    });
    if (!movies) {
      return res.status(200).json([]);
    }
    return res.status(200).json(movies);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error reading/write database" + error });
  }
};

moviesController.getMovieByRangeYear = async (req, res) => {
  const { yearStart, yearEnd } = req.params;
  try {
    const movies = await MovieModel.find({
      year: { $gte: yearStart, $lte: yearEnd },
    });
    if (!movies) {
      return res.status(200).json([]);
    }
    return res.status(200).json(movies);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error reading/write database" + error });
  }
};

module.exports = moviesController;

// const fs = require("fs");
// const path = require("path");
// const pathFile = path.resolve(__dirname, "../../data/users.json");

// usersController.getAllUsers = (req, res) => {
//   /*Primero leemos*/
//   fs.readFile(pathFile, (error, data) => {
//     if (error) {
//       /*enviamos una respuesta de error*/
//       res.status(500).json({ error: "Error al leer el archivo" });
//     } else {
//       /*Guardamos la información leida*/
//       const jsonData = JSON.parse(data);
//       res.status(200).json(jsonData);
//     }
//   });
// };

// usersController.createNewUser = (req, res) => {
//   /*Los nuevos datos que introducimos son en req.body*/
//   const newUser = req.body;
//   /*Primero Leer los datos disponibles*/
//   fs.readFile(pathFile, (error, data) => {
//     if (error) {
//       /*enviamos una respuesta de error si no se ha leido bien*/
//       res.status(500).json({ error: "Error al leer el archivo" });
//     } else {
//       /*guardar los datos originales*/
//       const jsonData = JSON.parse(data);
//       /*guardar los datos originales + los nuevos que introucidmos de new data*/
//       const newData = [...jsonData, newUser];
//       /*Tenemos todos los datos en newData, ahora tenemos que escribirlos*/
//       fs.writeFile(pathFile, JSON.stringify(newData), (error) => {
//         if (error) {
//           res.status(500).json({ error: "Error al guardar la informacion" });
//         } else {
//           res.status(201).json(newData);
//         }
//       });
//     }
//   });
// };

// usersController.deleteUser = (req, res) => {
//   /*buscar por id*/
//   const { id } = req.params;
// esto es igual a const (id = req.params.id) pero con esta manera hay que hacer una línea por constante, en la otra podemos meter las constantes en los {}
//   /*primero leer*/
//   fs.readFile(pathFile, (error, data) => {
//     if (error) {
//       /*enviamos una respuesta de error si no se ha leido bien*/
//       res.status(500).json({ error: "Error al leer el archivo" });
//     } else {
//       /*guardar los datos originales*/
//       const jsonData = JSON.parse(data);
//       /*econtrar el usuario por el id y con filter, queremos que nos muestre todos menos ese para borrarlo*/
//       const usersUpdate = jsonData.filter((user) => user.userId !== userId);
//       /*escribir lo nuevo*/
//       fs.writeFile(pathFile, JSON.stringify(usersUpdate), (error) => {
//         if (error) {
//           res.status(500).json({ error: "Error al guardar la informacion" });
//         } else {
//           res.status(202).json(usersUpdate);
//         }
//       });
//     }
//   });
// };

// usersController.updateUsers = (req, res) => {
//   /*buscar por id*/
//   const { id } = req.params;
//   /*primero leemos para buscar*/
//   fs.readFile(pathFile, (error, data) => {
//     if (error) {
//       /*enviamos una respuesta de error si no se ha leido bien*/
//       res.status(500).json({ error: "Error al leer el archivo" });
//     } else {
//       /*guardar los datos originales*/
//       const jsonData = JSON.parse(data);
//       /*econtrar el usuari por el id*/
//       const userFound = jsonData.find((user) => user.userId === userId);
//       if (userFound) {
//         res.status(200).json(userFound);
//       } else {
//         res.status(404).json({ error: "Usuario no encontrado" });
//       }
//       /*escribir los nuevos datos*/
//       userFound.name = req.body.name || userFound.name;
//       userFound.email = req.body.email || userFound.email;
//       /*escribir lo nuevo*/
//       fs.writeFile(pathFile, JSON.stringify(jsonData), (error) => {
//         if (error) {
//           res.status(500).json({ error: "Error al guardar la informacion" });
//         } else {
//           res.status(202).json(jsonData);
//         }
//       });
//     }
//   });
// };

// usersController.getUserById = (req, res) => {
//   const userId = req.params.id;

//   fs.readFile(pathFile, (error, data) => {
//     if (error) {
//       res.status(500).json({ error: "Error al leer el archivo" });
//     } else {
//       const jsonData = JSON.parse(data);
//       const userFound = jsonData.find((user) => user.userId === userId);
//       if (userFound) {
//         res.status(200).json([userFound]);
//       } else {
//         res.status(404).json({ error: "Usuario no encontrado" });
//       }
//     }
//   });
// };

// module.exports = usersController;
