const { Router } = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const rutaStaticas = require("./ruta").index

module.exports = function(rutas) {

  const patronRuta = /ruta/i
  const router = Router();

  router
    .use(cors())
    .use(bodyParser.urlencoded({extended:false}))
    .use(bodyParser.json())
    .use(compression());

    for(ruta in rutas){
      if(patronRuta.test(ruta)){
        router.use(rutaStaticas[ruta], rutas[ruta])
      }
    }  
  return router;
};