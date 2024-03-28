const { Router } = require("express");

module.exports = function ({ usuarioControlador, seguridad }) {
  const router = Router();
  router.post("/login", usuarioControlador.Acceder)
  router.post("/verify_token", usuarioControlador.VerifyToken)
  router.get("/roles", [
    seguridad.verificarAcceso
  ], usuarioControlador.mostrarRoles)
  
  router.get("/usuario", [
    seguridad.verificarAcceso
  ], usuarioControlador.mostrar)
  router.post("/usuario", [
    seguridad.verificarAcceso,
    seguridad.validarRol(['administrador'])
  ], usuarioControlador.registrar)
  router.put("/usuario", [
    seguridad.verificarAcceso,
    seguridad.validarRol(['administrador', 'usuario estandar'])
  ], usuarioControlador.actualizar)
  router.delete("/usuario/:_id", [
    seguridad.verificarAcceso,
    seguridad.validarRol(['administrador'])
  ], usuarioControlador.eliminar)
  router.get("/usuarios/buscar/:correo", [
    seguridad.verificarAcceso
  ], usuarioControlador.mostrarUsuarioCorreo)
  return router;
};
