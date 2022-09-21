// esta variable almacena la url para la conexzión a la base de datos de mongo.
// Para este caso se hace una validación para saber si la variable de entorno NODE_ENV es igual a test, si es así,
// se asigna la url de conexión a la base de datos de mongo de pruebas, si no, se hace otra validación para saber si la variable de entorno NODE_ENV es igual a development,
// si es así, se asigna la url de conexión a la base de datos de mongo de desarrollo, si no, se asigna la url de conexión a la base de datos de mongo de producción.
const uri = process.env.NODE_ENV?.match("test")
  ? "mongodb://localhost/saladejuntas_test"
  : "mongodb://" +
    (process.env.NODE_ENV === "production"
      ? process.env.MONGO_DB_HOST
      : process.env.NODE_ENV === "development"
      ? "127.0.0.1"
      : "127.0.0.1") +
    ":27017/saladejuntas";

// esta variable guarda la configuración para la conexión a la base de datos de mysql y mongo.
export const config = {
  DBConfig: {
    dbhost: process.env.MYSQL_DB_HOST || "localhost",
    dbname: process.env.MYSQL_DATABASE || "saladejuntas",
    dbuser: process.env.MYSQL_USER || "test",
    dbpassword: process.env.MYSQL_PASSWORD || "1234",
    port:
      parseInt(
        process.env.DB_PORT != undefined ? process.env.DB_PORT : "3306"
      ) || 3306,
  },
  mongodb: {
    URI: process.env.MONGO_URI || uri,
    USER: process.env.MONGO_USER || "",
    PASSWORD: process.env.MONGO_PASSWORD || "",
  },
};
