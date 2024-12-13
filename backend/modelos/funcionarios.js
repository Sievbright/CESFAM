const { Schema, model } = require("mongoose");

const funcionariosSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cargo: {
    type: String,
    required: true,
    enum: ["médico", "funcionario"],
  },
  nombreCompleto: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = model("Funcionarios", funcionariosSchema, "Funcionarios");
