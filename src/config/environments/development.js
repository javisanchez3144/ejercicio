module.exports = {
  //TOKEN
  JWT: {
    lifeTime: process.env.JWT_LIFETIME,
    secret: process.env.JWT_SECRET,
    algorithm: process.env.JWT_ALGORITHM
  },

  //BASES DE DATOS
  PORT: process.env.PORT,
  DB_MONGO: {
    dbName: process.env.DB_MONGO,
    url: 'mongodb://localhost:27017',
    config: {
      useNewUrlParser: true, useUnifiedTopology: true
    }
  },


};