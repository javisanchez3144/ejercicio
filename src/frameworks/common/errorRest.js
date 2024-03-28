'use strict'

class ErrorRest {
  error401(msg){ //no autorizado
    let err = Error.apply(this, [msg]);
    let ok = false;
    let name = err.name = "error401";
    let status = 401;
    let observacion = err.message;
    let stack = err.stack;
    return {ok, name, status, observacion};
  }
  error403(msg){ //prohibido
    let err = Error.apply(this, [msg]);
    let ok = false;
    let name = err.name = "error403";
    let status = 403;
    let observacion = err.message;
    let stack = err.stack;
    return {ok, name, status, observacion};
  }
  error404(msg){ //no encontrado
    let err = Error.apply(this, [msg]);
    let ok = false;
    let name = err.name = "error404";
    let status = 404;
    let observacion = err.message;
    let stack = err.stack;
    return {ok, name, status, observacion};
  }
  error500(msg){ //no encontrado
    let err = Error.apply(this, [msg]);
    let ok = false;
    let name = err.name = "error500";
    let status = 500;
    let observacion = err.message;
    let stack = err.stack;
    return {ok, name, status, observacion};
  }
  errorInfo(msg){ //todo ok, solo información
    let err = Error.apply(this, [msg]);
    let ok = false;
    let name = err.name = "errorInfo";
    let status = 200;
    let observacion = err.message;
    let stack = err.stack;
    return {ok, name, status, observacion};
 }
  errorDefecto500(err){ //todo ok, solo información
    let ok = false;
    let name = err.name = "error500";
    let status = 500;
    let observacion = err.message;
    let stack = err.stack;
    return {ok, name, status, observacion, stack};
  }
}

module.exports = new ErrorRest();