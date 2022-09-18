import mongoose from "mongoose";
import { config } from "../config/config";

// creamos una instancia de la clase mongoose y le pasamos la url de conexión a la base de datos de mongo
// que tenemos en la variable uri de la clase config.
mongoose.connect(config.mongodb.URI);
const connection = mongoose.connection;

// en caso de que la conexión a la base de datos de mongo falle, mostramos un mensaje en consola para saber que hubo un error.
// e imprimimos el error que nos arroja la conexión.
connection.on("error", (error) => {
  console.log("Error en la conexión a mongo", error);
  process.exit(0);
});
