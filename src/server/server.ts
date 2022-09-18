import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import { Http2Server } from "http2";

import usuariosRoute from "../routes/usuarios.route";
import loginRoute from "../routes/login.route";
import registroRoute from "../routes/registro.route";
import salonRoute from "../routes/salon.route";
import reservacionRoute from "../routes/reservacion.route";
import { validateToken } from "../config/validateToken";
import logPeticiones from "../models/logs.model";

// esta clase es la que se encarga de manejar las peticiones que se hacen al servidor
// así como de configurar el servidor para que pueda recibir peticiones.

export default class Server {
  public app: express.Application;
  public port: number;
  public server: Http2Server;

  constructor(port: number) {
    this.port = port;
    this.app = express();
  }

  static init(port: number) {
    return new Server(port);
  }

  async start(callback: Function) {
    // asignamos el puerto al servidor desde el archivo de configuración de variables de entorno .env
    // en caso de que no exista el puerto se asigna el puerto que se declara en el constructor de la clase.
    this.app.set("port", process.env.PORT || this.port);
    // configuramos el servidor para que los espacios del json sean en 2
    this.app.set("json spaces", 2);

    //Middlewares

    this.app.use(express.urlencoded({ extended: false }));
    // El middleware morgan muestra en consola las peticiones que se hacen al servidor
    this.app.use(
      morgan("combined", {
        // usamos el logger de morgan para registrar peticiones a la db
        skip: function (req, res) {
          // destructuramos el objeto req para obtener todos los datos de la petición por separado
          var response: any = req.headers;
          response["method"] = req.method;
          response["statusCode"] = res.statusCode;
          response["statusMessage"] = res.statusMessage;
          response["originalUrl"] = req.originalUrl;

          // guardamos los datos de la petición en la base de datos
          const logs = new logPeticiones(response);
          logs.save();
          return res.statusCode < 600;
        },
      })
    );

    this.app.use(json());
    // el middleware cors permite que el servidor pueda recibir peticiones de cualquier origen
    // en caso de que no se use este middleware el servidor solo podrá recibir peticiones de la misma dirección
    // desde la que se está haciendo la petición.
    this.app.use(
      cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
      })
    );
    // inicializamos el servidor y lo ponemos a escuchar en el puerto que se le asignó
    this.server = this.app.listen(this.app.get("port"), await callback());
    // creamos una ruta de prueba para saber que el servidor está corriendo
    // la cual es la ruta raíz del servidor
    this.app.get("/", (req, res) => {
      res.send("<h1 style='text-align:center'>Hola mundo</h1>");
    });

    // Rutas
    // comenzamos a definir las rutas que se van a usar en el servidor y las asignamos a las rutas que se crearon en el archivo de rutas
    this.app.use("/api/usuarios", validateToken, usuariosRoute);
    this.app.use("/api/login", loginRoute);
    this.app.use("/api/salon", validateToken, salonRoute);
    this.app.use("/api/reservacion", validateToken, reservacionRoute);
    this.app.use("/api/registro", registroRoute);
  }

  stop() {
    this.server.close();
  }
}
