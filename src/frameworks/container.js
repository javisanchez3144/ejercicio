const { asClass, createContainer, asFunction, asValue } = require("awilix")

//INICIO DE APLICACIÓN-----------------------------------------------------------------------
const StartUp = require("./startup")
const Server = require("./server")

//CONFIGURACIONES----------------------------------------------------------------------------
const config = require("../config/environments")
const monitor = require("./common/monitor")

//RUTAS--------------------------------------------------------------------------------------
const Routes = require("./web/routes")
const usuarioRuta = require("./web/routes/usuario/usuario.ruta")

//CONTROLADORES------------------------------------------------------------------------------
const {
  usuarioControlador
} = require("../controllers");

//MODELOS------------------------------------------------------------------------------------
const {
  UsuarioModelo
} = require("./persistance/modelo")

//BASE DE DATOS----------------------------------------------------------------------------
const Pgsql = require('./persistance/pgsql')
const MongoDb = require('./persistance/mongodb')
const db = require("./persistance/db")()

//SEGURIDAD Y CONTROL----------------------------------------------------------------------
const seguridad = require('./middleware/seguridad')
const limpiador = require("./common/limpiador")
const errorRest = require("./common/errorRest")

//DEPENDENCIAS EXTERNAS--------------------------------------------------------------------
const jshashes = require('jshashes');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const fs = require('fs');
const blowfish = require('sladex-blowfish');
const cron = require('node-cron');
const request = require('request');
const Multer = require('multer')
const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

//CONFIGURACIONES SOBRE MULTER-------------------------------------------------------------

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // No larger than 15mb, change as you need
  },
});

//CONTENEDOR-------------------------------------------------------------------------------
const container = createContainer();
container
  .register({
    app: asClass(StartUp).singleton(),
    router: asFunction(Routes).singleton(),
    server: asClass(Server).singleton(),

    // USUARIO
    usuarioRuta: asFunction(usuarioRuta).singleton(),
    usuarioControlador: asFunction(usuarioControlador).singleton(),

  })
  .register({
    db: asValue(db),
    pgsql: asClass(Pgsql).singleton(),
    mongodb: asClass(MongoDb).singleton(),
    monitor: asClass(monitor).singleton(),
  })
  .register({
    usuarioModelo: asClass(UsuarioModelo).singleton(),
  })
  .register({
    seguridad: asFunction(seguridad),
    limpiador: asValue(limpiador),
    wins: asValue(errorRest),
    config: asValue(config),
  })
  .register({
    jshashes: asValue(jshashes),
    jwt: asValue(jwt),
    fs: asValue(fs),
    nodemailer: asValue(nodemailer),
    handlebars: asValue(handlebars),
    moment: asValue(moment),
    blowfish: asValue(blowfish),
    cron: asValue(cron),
    request: asValue(request),
    multer: asValue(multer),
    path: asValue(path),
  })

//EXCEPCIONES----------------------------------------------------------------------------
process.on('uncaughtException', function (err) {
  console.log("***********************FECHA Y MENSAJE DEL ERROR**********************")
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
  console.log("**********************************************************************")
  console.log("SEGUIMIENTO DE LA PILA DE ERRRORES")
  console.log("***********************************************************************")
  console.error(err.stack);
  console.log("***********************************************************************")
  console.log('Enviamos un email al equipo de elize para avisarnos de un error.')
  //sendMail(err);
  process.exit(1);
})

module.exports = container;