import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import { Http2Server } from "http2";

import usuariosRoute from "../routes/usuarios.route";
import loginRoute from "../routes/login.route";
import salonRoute from "../routes/salon.route";
import reservacionRoute from "../routes/reservacion.route";
import { validateToken } from "../config/validateToken";
import logPeticiones from "../models/logs.model";

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
    this.app.set("port", process.env.PORT || this.port);
    this.app.set("json spaces", 2);

    //Middlewares
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(
      morgan("combined", {
        // usamos el logger de morgan para registrar peticiones a la db
        skip: function (req, res) {
          var response: any = req.headers;
          response["method"] = req.method;
          response["statusCode"] = res.statusCode;
          response["statusMessage"] = res.statusMessage;
          response["originalUrl"] = req.originalUrl;

          const logs = new logPeticiones(response);
          // console.log(response);
          logs.save();
          return res.statusCode < 600;
        },
      })
    );
    this.app.use(json());
    this.app.use(
      cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
      })
    );
    this.server = this.app.listen(this.app.get("port"), await callback());
    this.app.get("/", (req, res) => {
      res.send("<h1 style='text-align:center'>Hola mundo</h1>");
    });

    this.app.use("/api/usuarios", validateToken, usuariosRoute);
    this.app.use("/api/login", loginRoute);
    this.app.use("/api/salon", validateToken, salonRoute);
    this.app.use("/api/reservacion", validateToken, reservacionRoute);

    // this.app.use('/empresas', validateToken, routeEmpresa);
    // this.app.use('/mesas', validateToken, routeMesa);
  }

  stop() {
    this.server.close();
  }
}
