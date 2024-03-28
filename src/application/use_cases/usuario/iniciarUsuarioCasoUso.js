const Usuario = require('../../../entities/usuario/usuario.entidad');
const rondasDeSal = 10;
const bcrypt = require("bcryptjs");
const moment = require('moment')
module.exports = (usuarioModelo, wins) => {
  async function acceder(x = {}) {
    const usuario = new Usuario(x).acceder();
    const res = await usuarioModelo.acceder(usuario);
    let roles = {}
    let datos = {}
    if (res) {
      let validarContrasena = await bcrypt.compare(usuario.contrasena, res.contrasena);
      if (res && validarContrasena) {
        roles.idRol = res.idRol
        let rol = await usuarioModelo.rol(res)
        //modulos
        let modulos = await usuarioModelo.modulos(res.idRol)
        let moduloDetalle = await usuarioModelo.subModulos()
        let paginas = await usuarioModelo.paginas()
        modulos.forEach((x, y) => {
          let buscar = moduloDetalle.filter(e => e.idModulo == x._id)
          if (buscar.length > 0) {
            // let buscarPagina = paginas.find(e=> e._id == buscar._id)
            modulos[y].pages = buscar
            buscar.forEach((element, index) => {
              let buscarPagina = paginas.filter(e => e.idSubModulo == element._id)
              if (buscarPagina.length > 0) {
                modulos[y].pages[index].sub = buscarPagina
              }
            });
          }

        })
        roles.rol = rol.nombre
        roles.modulos = modulos
        roles.actividades = rol.actividades
        datos = {
          _id: res._id,
          correo: res.correo,
          roles: roles,
        }
      } else {
        datos = {
          errors: {
            email: ['The provided credentials are incorrect']
          },
          message: 'Usuario o Contraña incorrectos'
        }
      }
    } else {
      datos = {
        errors: {
          email: ['The provided credentials are incorrect']
        },
        message: 'Usuario o Contraña incorrectos'
      }
    }

    return datos;
  }
  async function registrar(x = {}) {
    const usuario = new Usuario(x).registrar();
    let result = {
      ok: false,
      observacion: 'Usuario no se pudo registrar'
    }
    let validarCorreo = await usuarioModelo.validarCorreo(usuario);
    if (validarCorreo) {
      throw wins.errorInfo('Ya existe un Usuario con este correo.')
    } else {
      usuario.contrasena = await bcrypt.hash(usuario.contrasena, rondasDeSal);
      usuario.creado = moment().format('YYYY-MM-DD HH:MM:ss')
      let registrarUsuario = await usuarioModelo.registrar(usuario)
      if (registrarUsuario && registrarUsuario.acknowledged) {
        result.ok = true
        result.observacion = 'Usuario creado correctamente'
      }
    }

    return result;
  }
  async function actualizar(x = {}) {
    const usuario = new Usuario(x).actualizar();
    let result = {
      ok: false,
      observacion: 'Usuario no se pudo actualizar'
    }
    let validarCorreo = await usuarioModelo.validarCorreo(usuario);
    if (validarCorreo && usuario._id !== validarCorreo._id) {
      throw wins.errorInfo('Ya existe un Usuario con este correo. No se va a poder modificar')
    } else {
      usuario.modificado = moment().format('YYYY-MM-DD HH:MM:ss')
      let actualizarUsuario = await usuarioModelo.actualizar(usuario)
      if (actualizarUsuario && actualizarUsuario.ok === 1) {
        result.ok = true
        result.observacion = 'Usuario actualizado correctamente'
      }
    }

    return result;
  }
  async function validarUsuario(x = {}) {
    const usuario = new Usuario(x).validarUsuario();

    const res = await usuarioModelo.validarUsuario(usuario);


    return res;
  }
  async function mostrar(x = {}) {
    let usuarios = await usuarioModelo.mostrar();
    let mostrarRoles = await usuarioModelo.mostrarRoles()
    let buscarRolUsuario = mostrarRoles.find(rol => rol._id == x.idRol)
    if (buscarRolUsuario && buscarRolUsuario.nombre == 'usuario estandar') {
      usuarios = usuarios.filter(usuario => usuario.correo == x.correo)
    }
    usuarios.forEach(usuario => {
      let buscarRol = mostrarRoles.find(rol => rol._id == usuario.idRol)
      usuario.nombreRol = buscarRol.nombre
    });

    return usuarios;
  }
  async function mostrarUsuarioCorreo(x = {}) {
    let usuarios = await usuarioModelo.mostrarUsuarioCorreo(x.correo);
    let mostrarRoles = await usuarioModelo.mostrarRoles()
    usuarios.forEach(e => {
      let buscarRol = mostrarRoles.find(rol => rol._id == e.idRol)
      if (buscarRol) {
        e.nombreRol = buscarRol.nombre
      }
    });
    return usuarios;
  }
  

  async function mostrarRoles(x = {}) {
    const res = await usuarioModelo.mostrarRoles();

    return res;
  }

  async function eliminar(x = {}) {
    let respuesta = {
      ok: false,
      observacion: 'No se pudo eliminar el usuario'
    }
    let usuarioEliminado = await usuarioModelo.eliminar(x._id);
    if(usuarioEliminado && usuarioEliminado.acknowledged) {
      respuesta.ok = true
      respuesta.observacion = 'Usuario eliminado correctamente'
    }
    return respuesta;
  }

  return {
    acceder,
    registrar,
    actualizar,
    validarUsuario,
    mostrar,
    mostrarRoles,
    eliminar,
    mostrarUsuarioCorreo
  };
};