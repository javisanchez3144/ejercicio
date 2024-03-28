module.exports = class Usuario {
  constructor(x = { _id: null, idUsuario: null, accion: 'mostrar', correo: null, contrasena: null, nombres: null, idRol: null }) {
    ({
      _id: this._id = x._id,
      idUsuario: this.idUsuario = x.idUsuario,
      accion: this.accion = x.accion,
      correo: this.correo = x.correo,
      contrasena: this.contrasena = x.contrasena,
      nombres: this.nombres = x.nombres,
      idRol: this.idRol = x.idRol
    } = x);
  }
  acceder() {
    return {
      correo: this.correo,
      contrasena: this.contrasena,
    }
  }
  registrar() {
    return {
      nombres: this.nombres,
      correo: this.correo,
      idRol: this.idRol,
      contrasena: this.contrasena,
      idUsuario: this.idUsuario
    }
  }
  actualizar() {
    return {
      _id: this._id,
      nombres: this.nombres,
      correo: this.correo,
      idRol: this.idRol,
      idUsuario: this.idUsuario
    }
  }
  validarUsuario() {
    return {
      _id: this._id
    }
  }

};
