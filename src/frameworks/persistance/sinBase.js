
module.exports = class SinBase {
     
    obtener() {
        return Promise.reject(new Error("no se conecto a ninguna base de datos."))
    }
    

}