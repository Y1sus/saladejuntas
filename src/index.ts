import Server from "./server/server";
import { sequelize } from "./database/database";
import { NodeCron } from "./utils/crontab";
const server = Server.init(4000);

const cron = new NodeCron();

cron.callCron();
server.start(() => {
  console.log("Servidor corriendo en el puerto", server.port);
});
const conn = sequelize.authenticate();
conn.catch((err) => {
  console.log("Error al conectarse a la base de datos ", err);
});
