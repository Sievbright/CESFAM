const { Schema, model } = require("mongoose");

const medicamentoSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  dosis: {
    type: String,
    required: true,
  },
  forma: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  fecha_expiracion: {
    type: Date,
    required: true,
  },
  proveedor: {
    type: String,
    required: true,
  },
});

module.exports = model("Medicamento", medicamentoSchema, "Medicamentos");
