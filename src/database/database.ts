import { Sequelize } from "sequelize-typescript";
import { DetallesUsuario } from "../models/detalles_usuario.model";
import { TiposUsuario } from "../models/tipos_usuario.model";
import { Usuario } from "../models/usuario.model";
import { config } from "../config/config";
import { Salon } from "../models/salon.model";
import { Reservacion } from "../models/reservacion.model";
import { SalonEstatus } from "../models/salon_estatus.model";

// Qué es Sequelize?
// Sequelize es un ORM para Node.js que soporta las bases de datos relacionales PostgreSQL, MySQL, MariaDB, SQLite y Microsoft SQL Server.
// Sequelize usa promesas para todas sus operaciones asíncronas, lo que hace que sea muy fácil de usar con async / await o .then ().
// Sequelize tiene una API de flujo de trabajo de estilo ActiveRecord, lo que significa que no necesita escribir consultas SQL directamente.
/**
 * Clase que contiene la conexión a la base de datos
 * @class Database
 * @developer Jes´ús Montalvo
 * @version 1.0.0
 * @since 1.0.0
 * @date 2022-09-17
 * @license Owner
 *
 * // Language: typescript
 * // Path: src/database/database.ts
 **/
// esta es la clase que crea la conexión a la base de datos
// con sequelize-typescript y la exporta para que pueda ser
// utilizada en cualquier parte del proyecto.
class DataBase {
  private _sequelize: Sequelize;
  constructor() {
    // se crea el objeto de la clase Sequelize
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
        logging: false,
        repositoryMode: true,
      }
    );

    // se agregan los modelos a la conexión de la base de datos
    this._sequelize.addModels([
      Usuario,
      TiposUsuario,
      DetallesUsuario,
      Salon,
      SalonEstatus,
      Reservacion,
    ]);
  }
  public getSequelize() {
    return this._sequelize;
  }
}
const database = new DataBase();
export const sequelize = database.getSequelize();
