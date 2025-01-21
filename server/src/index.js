const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");
const moviesRoutes = require("./routes/movies.routes");
const corsOptions = {
  origin: "*", // Orígenes permitidos (cuando esté en un dominio real, lo cambiaremos por ese dominio) Desde donde vamos a poder hacer peticiones al servidor, el asterisco quiere decir que se pueden hacer peticion desde cualquier parte, luego se cambia al dominio del server.
  methods: ["GET", "POST", "PATCH", "DELETE"], // Métodos permitidos Los métodos son los que vamos a aceptar,
  allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos. Que cabeceras de peticion permitimos, solo vamos a usar de que avisan que estmos usando contenido
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/movies", moviesRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected");
  } catch (error) {
    console.log(`conection error `, error);
  }
};

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

startServer();
