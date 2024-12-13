const { Schema, model } = require("mongoose");

const recetaSchema = Schema({
  paciente: {
    type: String,
    required: true,
  },
  rut: {
    type: String,
    required: true,
    unique: true,
  },
  correo: {
    type: String,
    required: true,
  },
  fecha_emision: {
    type: Date,
    required: true,
  },
  medicamentos: {
    type: String,
    required: true,
  },
  dosis: {
    type: String,
    required: true,
  },
  fecha_termino: {
    type: Date,
    required: true,
  },
});

module.exports = model("Receta", recetaSchema, "Recetas");
