'use strict'
const MostrarUsuario = require('../../application/use_cases/usuario/iniciarUsuarioCasoUso')

let seguridad = ({ usuarioModelo, config, jwt, wins }) => {

  function verificarAcceso(req, res, next) {
    let token = req.headers.authorization.split(" ")[1]

    if (!token) {
      return next(wins.error403("Sin autorización para realizar esta petición."));
    }
    jwt.verify(token, config.JWT.secret, (err, payload) => {
      if (err) {
        // return next(wins.error403(err.message));
        return res.json({ ok: false, observacion: 'Usuario no autenticado. Inicie sesión por favor.' });
      } else {
        const usuario = MostrarUsuario(usuarioModelo);

        usuario.validarUsuario({ _id: payload._id }).then((result) => {
          if (!result) {
            return res.json({ ok: false, observacion: 'Acceso denegado. Por favor vuelva a iniciar sesión.' });
          }
          let datosUsuario = {
            _id: result._id,
            correo: result.correo,
            idRol: result.idRol
          }
          req.usuario = datosUsuario;
          next()
        }).catch(err => {
          console.log(err)
          next(wins.error500(err))
        })
      }
    });
  }

  function generarToken(x = {}) {
    const payload = {
      _id: x._id,
      correo: x.correo,
      rol: x.roles.rol,
      actividades: x.roles.actividades,
      modulos: x.roles.modulos,
      // exp: Math.round(Date.now()/5000) + parseInt(config.JWT.lifeTime),
    };
    const api_token = jwt.sign(JSON.stringify(payload), config.JWT.secret);
    return api_token;
  }

  function validarRol(rolesPermitidos) {
    return function (req, res, next) {
      const token = req.headers.authorization.split(" ")[1]
      if (!token) {
        return res.status(401).json({ mensaje: "Token no proporcionado" });
      }

      try {
        const decoded = jwt.verify(token, config.JWT.secret);
        const rolUsuario = decoded.rol;
        if (rolesPermitidos.includes(rolUsuario)) {
          next();
        } else {
          return res.status(403).json({ mensaje: "No tienes permisos para acceder a esta ruta" });
        }
      } catch (error) {
        return res.status(401).json({ mensaje: "Token inválido" });
      }
    }
  }

  return {
    verificarAcceso,
    generarToken,
    validarRol
  }
}

module.exports = seguridad;