module.exports = class BaseDeDatosInterfaz {
  desconectar() {
    return Promise.reject(new Error("No cumplió con la implementacion desconectar, interfazDB"))
  }
  ejecutar() {
    return Promise.reject(new Error("No cumplió con la implementacion ejecutar, interfazDB"))
  }
  obtener() {
    return Promise.reject(new Error("No cumplió con la implementacion obtener, interfazDB"))
  }
}