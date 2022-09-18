import mongoose from "mongoose";
import { config } from "../config/config";

mongoose.connect(config.mongodb.URI);
const connection = mongoose.connection;

// connection.once('open', () => {
//    console.log('Conexión a mongo establecida');
// });

connection.on('error', (error) => {
   console.log('Error en la conexión a mongo', error);
   process.exit(0);
})