BaseDeDatosInterfaz = require("../../application/interfaz/db.interfaz");
const { MongoClient } = require('mongodb');
//console.log('jajajaja', MongoClient)
module.exports = class MongoDb extends BaseDeDatosInterfaz {

  db = null;
  config = {}

  constructor(config) {
    super()
    this.config = config
    this.db = new MongoClient(config.DB_MONGO.url, {
      useNewUrlParser: true, useUnifiedTopology: true
    })
  }

  async conectar() {
    await this.db.connect()
    return this.db.db(this.config.DB_MONGO.dbName)
  }

  obtener() {
    return this.db
  }

  desconectar() {

  }
  ejecutar() {

  }

}