const BaseDeDatosInterfaz = require("../../application/interfaz/db.interfaz");
const { Pool } = require('pg')

module.exports = class PostgreSql extends BaseDeDatosInterfaz {

    db = null;

    constructor(config) {
        super()
        this.db = new Pool(config.DB_PGSQL)
    }

    conectar() {
        return this.db
    }

    desconectar() {

    }
    ejecutar() {

    }
}