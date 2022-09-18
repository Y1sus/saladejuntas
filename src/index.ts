import Server from "./server/server";
import { sequelize } from "./database/database";
import "./database/database.mongo";
import { NodeCron } from "./utils/crontab";
const server = Server.init(4000);

// la clase NodeCron es la encargada de ejecutar el crontab para actualizar la base de datos.
// Aquí creamos la instancia de la clase NodeCron y llamamos al método callCron() para que se ejecute el crontab.
const cron = new NodeCron();

cron.callCron();

// iniciamos el servidor y mostramos un mensaje en consola para saber que el servidor está corriendo.
server.start(() => {
  console.log("Servidor corriendo en el puerto", server.port);
});

// creamos un objeto que le asignamos la conexión que tenemos con la base de datos de mysql 
const conn = sequelize.authenticate();
conn.catch((err) => {
  console.log("Error al conectarse a la base de datos ", err);
});
