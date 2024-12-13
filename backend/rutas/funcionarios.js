const express = require("express");

const funcionarioControlador = require("../controladores/funcionarios");

const router = express.Router();

// Rutas de funcionarios
router.post("/crear", funcionarioControlador.crearfuncionario);
router.get("/listar", funcionarioControlador.listar);
router.get("/listaruno/:id", funcionarioControlador.listarUno);
router.delete("/borrar/:id", funcionarioControlador.borrar);
router.put("/editar/:id", funcionarioControlador.editar);
router.get("/buscar/:busqueda", funcionarioControlador.buscador);
router.post("/login", funcionarioControlador.login);
module.exports = router;
