const Pgsql = require('./pgsql')
const MongoDb = require('./mongodb')
const SinBase = require('./sinBase')
const config = require('../../config/environments')

class Db{

  config = {}
  
  constructor(config){
    this.config = config
  }

  conectar(db){
    return db.conectar();
  }

  elegirDb(base = 'mongo'){
    let motorDb = null;
    switch(base){
      case 'pgsql': motorDb = new Pgsql(this.config) ;break;
      case 'mongo':  motorDb = new MongoDb(this.config); break;
      default: motorDb = new SinBase();
    }
    return motorDb
  }

  fabrica(base = 'mongo'){
    return this.elegirDb(base);
  }
}

module.exports = () => {
  const db = new Db(config)
  return db.conectar(db.fabrica())
}
