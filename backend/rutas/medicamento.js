const express = require("express");

const medicamentoControlador = require("../controladores/Medicamento");

const router = express.Router();

// Rutas de medicamentos
router.post("/crear", medicamentoControlador.crearMedicamento);
router.get("/listar", medicamentoControlador.listar);
router.get("/listaruno/:id", medicamentoControlador.listar_uno);
router.delete("/borrar/:id", medicamentoControlador.borrar);
router.put("/editar/:id", medicamentoControlador.editar);
router.get("/buscar/:busqueda", medicamentoControlador.buscador);

module.exports = router;
