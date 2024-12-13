const express = require("express");

const recetasControlador = require("../controladores/recetas");

const router = express.Router();

// Rutas de Recetas
router.post("/crear", recetasControlador.crearReceta);
router.get("/listar", recetasControlador.listar);
router.get("/listaruno/:id", recetasControlador.listarUno);
router.delete("/borrar/:id", recetasControlador.borrar);
router.put("/editar/:id", recetasControlador.editar);
router.get("/buscar/:busqueda", recetasControlador.buscador);

module.exports = router;
