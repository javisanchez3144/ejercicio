const express = require("express");
const http = require('http');
const https = require('https');
const fs = require("fs");
const path = require("path");
const { notFound, serverError } = require("./common/errorManejador");

class Server {

  constructor({ config, router }) {
    this._config = config;
    this._express = express();
    this._express.use(express.static('frontend'));
    this._express.use("/", router);
    this._express.use(serverError)
    this._express.use(notFound)
  }

  start() {
    return new Promise((resolve, reject) => {
      const servidor1 = http.createServer(this._express);
      // const sslPath = '/etc/letsencrypt/live/api.elize.com.ec/';
      // const credentials = {
      //   key: fs.readFileSync(sslPath + 'privkey.pem'),
      //   cert: fs.readFileSync(sslPath + 'fullchain.pem')
      // };
      // const servidor2 = https.createServer(credentials,this._express);

      servidor1.listen(this._config.PORT, '0.0.0.0', () => {
        const { port } = servidor1.address();
        console.log("Aplicación API REST corriendo en el puerto: " + port)
        resolve();
      });

      // servidor2.listen(443, () => {
      //   const { port } = servidor2.address();
      //   console.log("Aplicación API REST corriendo en el puerto: " + port)
      //   resolve();
      // });
    });
  }
}

module.exports = Server;