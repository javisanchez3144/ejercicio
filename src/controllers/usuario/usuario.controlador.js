const IniciarUsuario = require('../../application/use_cases/usuario/iniciarUsuarioCasoUso');

module.exports = ({ usuarioModelo, wins, limpiador, seguridad, request, jshashes, config, moment, jwt }) => {

  const Acceder = (req, res, next) => {
    let x = VALIDAR(req.usuario, req.body, req.method, 'ACCEDER');
    if (!x.error.ok) { return next(wins.errorInfo(x.error.mensaje)) }

    const usuario = IniciarUsuario(usuarioModelo, wins);
    let resultado = {
      ok: false
    }
    usuario.acceder(x.target).then((result) => {
      let status = 422
      resultado.observacion = result.message
      if (!result.errors) {
        delete result.password
        resultado.ok = true
        resultado.observacion = 'Acceso Correcto'
        result.api_token = seguridad.generarToken(result)
        result.rol = result.roles.rol
        result.actividades = result.roles.actividades
        resultado.datos = result
        status = 200
      }
      res.status(status).json(resultado);
    }).catch(err => { next(err); })
  }
  const registrar = (req, res, next) => {
    let x = VALIDAR(req.usuario, req.body, req.method, 'ACCEDER');
    if (!x.error.ok) { return next(wins.errorInfo(x.error.mensaje)) }
    const usuario = IniciarUsuario(usuarioModelo, wins);
    usuario.registrar(x.target).then((result) => {
      res.json(result);
    }).catch(err => { next(err); })
  }
  const mostrar = (req, res, next) => {
    let x = VALIDAR(req.usuario, req.body, req.method, 'ACCEDER');

    const usuario = IniciarUsuario(usuarioModelo, wins);
    usuario.mostrar(x.target).then((result) => {
      result.forEach(x => {
        delete x.contrasena
      });
      let datos = {
        ok: true,
        datos: result
      }
      res.json(datos);
    }).catch(err => { next(err); })
  }
  const mostrarUsuarioCorreo = (req, res, next) => {
    let x = VALIDAR(req.usuario, req.params, req.method, 'ACCEDER');

    const usuario = IniciarUsuario(usuarioModelo, wins);
    usuario.mostrarUsuarioCorreo(x.target).then((result) => {
      result.forEach(x => {
        delete x.contrasena
      });
      let datos = {
        ok: true,
        datos: result
      }
      res.json(datos);
    }).catch(err => { next(err); })
  }
  

  function VALIDAR(usuario = {}, cuerpo = {}, accion, tipo) {
    let validacion = {}

    switch (tipo) {
      case 'ACCEDER':
        validacion.correo = { tipo: 'string', nombre: 'correo', necesario: true, limpiar: true }
        validacion.password = { tipo: 'string', nombre: 'password', necesario: true, limpiar: true }
        break;
      default:
        mensaje = "El tipo de petición no es correcto.";
        break;
    }
    return limpiador({ usuario, cuerpo, accion }, validacion)
  }
  const VerifyToken = (req, res, next) => {
    // const token = req.header('auth-token')
    const token = req.body.api_token
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
      const verified = jwt.verify(token, config.JWT.secret)
      req.user = verified
      req.user.api_token = token
      res.json(req.user)
      // next() // continuamos
    } catch (error) {
      res.status(400).json({ error: 'token no es válido' })
    }


  }

  const mostrarRoles = (req, res, next) => {
    let x = VALIDAR(req.usuario, req.body, req.method, 'ACCEDER');

    const usuario = IniciarUsuario(usuarioModelo, wins);
    usuario.mostrarRoles(x.target).then((result) => {
      let datos = {
        ok: true,
        datos: result
      }
      res.json(datos);
    }).catch(err => { next(err); })
  }
  const eliminar = (req, res, next) => {
    let x = VALIDAR(req.usuario, req.params, req.method, 'ACCEDER');
    const usuario = IniciarUsuario(usuarioModelo, wins);
    usuario.eliminar(x.target).then((result) => {
      res.json(result);
    }).catch(err => { next(err); })
  }
  const actualizar = (req, res, next) => {
    let x = VALIDAR(req.usuario, req.body, req.method, 'ACCEDER');
    if (!x.error.ok) { return next(wins.errorInfo(x.error.mensaje)) }
    const usuario = IniciarUsuario(usuarioModelo, wins);
    usuario.actualizar(x.target).then((result) => {
      res.json(result);
    }).catch(err => { next(err); })
  }
  return {
    Acceder,
    registrar,
    actualizar,
    mostrar,
    mostrarUsuarioCorreo,
    eliminar,
    VerifyToken,
    mostrarRoles
  };
};