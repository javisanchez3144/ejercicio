'use strict'

const { MongoClient } = require('mongodb');
const dbName = 'bienes-raices';
const url = 'mongodb://localhost:27017';

const client = new MongoClient(url, {
    useNewUrlParser: true, useUnifiedTopology: true
});
  
module.exports = async () => {
    // Conectamos al servidor
    await client.connect();
  
    return client.db(dbName); // retornamos la conexión con el nombre de la bd a usar
};