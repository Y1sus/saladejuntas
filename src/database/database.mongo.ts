import mongoose from "mongoose";
import { config } from "../config/config";

mongoose.connect(config.mongodb.URI);
const connection = mongoose.connection;

// connection.once('open', () => {
//    console.log('Conexion a mongo establecida');
// });

connection.on('error', (error) => {
   console.log('Error en la conexion a mongo', error);
   process.exit(0);
})