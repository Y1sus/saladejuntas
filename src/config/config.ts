const uri = process.env.NODE_ENV?.match("test")
  ? "mongodb://localhost/saladejuntas_test"
  : "mongodb://" +
    (process.env.NODE_ENV === "production"
      ? process.env.MONGO_DB_HOST == undefined
        ? "localhost"
        : process.env.MONGO_DB_HOST
      : process.env.MONGO_DB_HOST == undefined
      ? "localhost"
      : process.env.MONGO_DB_HOST) +
    ":27017/saladejuntas";

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
