const UsuarioInterfaz = require('../../../../application/interfaz/usuario/usuario.interfaz');
const ObjectId = require('mongodb').ObjectId;
module.exports = class UsuarioModelo extends UsuarioInterfaz {
  db = null;

  constructor({ db }) {
    super();
    this.iniciarVariable(db)
    this.db = db;
  }
  async iniciarVariable(db) {
    this.db = await db
  }
  async acceder(x = {}) {
    try {
      return await this.db.collection("usuarios").findOne({ correo: x.correo });
    } catch (err) {

      console.log(err)

      throw new Error(err.message);
    }
  }
  async rol(x = {}) {
    try {
      return await this.db.collection("roles").findOne({ _id: x.idRol })
    } catch (err) {

      console.log(err)

      throw new Error(err.message);
    }
  }
  async modulos(x = {}) {
    try {
      return await this.db.collection("modulos").find({ idRol: x }).toArray();
    } catch (err) {

      console.log(err)

      throw new Error(err.message);
    }
  }
  async subModulos(x = {}) {
    try {
      return await this.db.collection("submodulos").find({}).toArray();
    } catch (err) {

      console.log(err)

      throw new Error(err.message);
    }
  }
  async paginas(x = {}) {
    try {
      return await this.db.collection("paginas").find({}).toArray();
    } catch (err) {

      console.log(err)

      throw new Error(err.message);
    }
  }
  async validarCorreo(x = {}) {
    try {
      return await this.db.collection("usuarios").findOne({ correo: x.correo });
    } catch (err) {

      console.log(err)

      throw new Error(err.message);
    }
  }
  async validarUsuario(x = {}) {
    try {
      return await this.db.collection("usuarios").findOne({ _id: x._id });
    } catch (err) {

      console.log(err)

      throw new Error(err.message);
    }
  }
  async registrar(x = {}) {
    try {
      x._id = (new ObjectId).toString()
      return await this.db.collection("usuarios").insertOne(x);
    } catch (err) {

      console.log(err)

      throw new Error(err.message);
    }
  }
  async mostrar(x = {}) {
    try {
      return await this.db.collection("usuarios").find({}).toArray();
    } catch (err) {

      console.log(err)

      throw new Error(err.message);
    }
  }
  async mostrarUsuarioCorreo(x = {}) {
    try {
      return await this.db.collection("usuarios").find({correo: x}).toArray();
    } catch (err) {

      console.log(err)

      throw new Error(err.message);
    }
  }
  
  async mostrarRoles(x = {}) {
    try {
      return await this.db.collection("roles").find().toArray()
    } catch (err) {

      console.log(err)

      throw new Error(err.message);
    }
  }

  async actualizar(x = {}) {
    try {
      return await this.db.collection('usuarios').findOneAndUpdate({ _id: x._id }, {
        $set: x
      })
    } catch (err) {

      console.log(err)

      throw new Error(err.message);
    }
  }

  async eliminar(x = {}) {
    try {
      return await this.db.collection("usuarios").deleteOne({ _id: x })
    } catch (err) {

      console.log(err)

      throw new Error(err.message);
    }
  }

};