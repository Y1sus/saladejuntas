import { Sequelize } from "sequelize-typescript";
import { DetallesUsuario } from "../models/detalles_usuario.model";
import { TiposUsuario } from "../models/tipos_usuario.model";
import { Usuario } from "../models/usuario.model";
import { config } from "../config/config";

class DataBase {
  private _sequelize: Sequelize;
  constructor() {
    this._sequelize = new Sequelize(
      config.DBConfig.dbname,
      config.DBConfig.dbuser,
      config.DBConfig.dbpassword,
      {
        host: config.DBConfig.dbhost,
        dialect: "mysql",
        pool: {
          max: 10,
          min: 0,
          idle: 10000,
        },
        logging: false ,
        repositoryMode: true,
      }
    );

    this._sequelize.addModels([
      Usuario,
      TiposUsuario,
      DetallesUsuario
    ]);
  }
  public getSequelize() {
    return this._sequelize;
  }
}
const database = new DataBase();
export const sequelize = database.getSequelize();
