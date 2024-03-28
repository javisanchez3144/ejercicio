module.exports = {
  PORT: process.env.PORT,
  DB_PGSQL: {
    username: "postgres",
    password: "psql",
    database: "elize",
    host: "test.api.elize.com.ec",
    dialect: "postgres",
    logging: false
  },
  DB_MONGO: {
    dbName: process.env.DB_MONGO,
    // url: "mongodb://localhost:27017",
    url: 'mongodb://'+process.env.USUARIO_DB_MONGO+':'+process.env.CONTRASENA_DB_MONGO+'@'+process.env.HOST+':'+process.env.PORTM+'/?authMechanism=DEFAULT',
    config: {
      useNewUrlParser: true, useUnifiedTopology: true
    }
  }
};
