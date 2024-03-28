const winston = require('./winston');
const errorRest = require('./errorRest')

function registrarErrorLog(err, req){
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
}

const serverError = (err, req, res, next) => {

    let error = err;

    registrarErrorLog(err,req);
   
    err.ok === undefined ? error = errorRest.errorDefecto500(err) : ''
  
    res.status(err.status || 500);
    res.json( error );
};

const notFound = (req,res) => {
    res.status(400);
    res.json({ error: "¡Página no encontrada!" });
}

module.exports = {
    serverError,
    notFound
}
