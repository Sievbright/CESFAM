const validator = require("validator");

// FUNCIONARIOS

// Validar datos de un funcionario
const validarFuncionario = (parametros) => {
  if (typeof parametros.username !== "string" || !parametros.username) {
    throw new Error(
      "El campo 'username' es obligatorio y debe ser una cadena de texto."
    );
  }
  if (typeof parametros.password !== "string" || !parametros.password) {
    throw new Error(
      "El campo 'password' es obligatorio y debe ser una cadena de texto."
    );
  }
  if (typeof parametros.cargo !== "string" || !parametros.cargo) {
    throw new Error(
      "El campo 'cargo' es obligatorio y debe ser una cadena de texto."
    );
  }
  if (
    typeof parametros.nombreCompleto !== "string" ||
    !parametros.nombreCompleto
  ) {
    throw new Error(
      "El campo 'nombreCompleto' es obligatorio y debe ser una cadena de texto."
    );
  }
  if (typeof parametros.email !== "string" || !parametros.email) {
    throw new Error(
      "El campo 'email' es obligatorio y debe ser una cadena de texto."
    );
  }
};

// Validar ID de un funcionario (por ejemplo, en MongoDB)
const validarIdfuncionarios = (id) => {
  let validar_id =
    !validator.isEmpty(id) && validator.isLength(id, { min: 24, max: 24 });

  if (!validar_id) {
    throw new Error("No se ha validado el ID del funcionario!");
  }
};

// MEDICAMENTOS

const validarmedicamento = (parametros) => {
  let validar_nombre = !validator.isEmpty(parametros.nombre);
  let validar_dosis = !validator.isEmpty(parametros.dosis);
  let validar_forma = !validator.isEmpty(parametros.forma);
  let validar_cantidad =
    !validator.isEmpty(parametros.cantidad) &&
    validator.isNumeric(parametros.cantidad.toString());
  let validar_fecha_expiracion =
    !validator.isEmpty(parametros.fecha_expiracion) &&
    validator.isDate(parametros.fecha_expiracion.toString());
  let validar_proveedor = !validator.isEmpty(parametros.proveedor);

  if (
    !validar_nombre ||
    !validar_dosis ||
    !validar_forma ||
    !validar_cantidad ||
    !validar_fecha_expiracion ||
    !validar_proveedor
  ) {
    throw new Error("Faltan datos o los datos son inválidos.");
  }
};

// Validación para el ID del medicamento
const validarIdmedicamento = (id) => {
  let validar_id =
    validator.isLength(id, { min: 24, max: 24 }) &&
    validator.isAlphanumeric(id);
  if (!validar_id) {
    throw new Error("El ID del medicamento no es válido.");
  }
};

// RECETAS

const validarReceta = (parametros) => {
  let validar_paciente = !validator.isEmpty(parametros.paciente);
  let validar_rut =
    !validator.isEmpty(parametros.rut) &&
    validator.isLength(parametros.rut, { min: 9, max: 9 });
  let validar_correo =
    !validator.isEmpty(parametros.correo) &&
    validator.isEmail(parametros.correo);
  let validar_fecha_emision =
    !validator.isEmpty(parametros.fecha_emision) &&
    validator.isISO8601(parametros.fecha_emision);
  let validar_medicamentos = !validator.isEmpty(parametros.medicamentos);
  let validar_dosis = !validator.isEmpty(parametros.dosis);
  let validar_fecha_termino =
    !validator.isEmpty(parametros.fecha_termino) &&
    validator.isISO8601(parametros.fecha_termino);

  if (
    !validar_paciente ||
    !validar_rut ||
    !validar_correo ||
    !validar_fecha_emision ||
    !validar_medicamentos ||
    !validar_dosis ||
    !validar_fecha_termino
  ) {
    throw new Error("Faltan datos obligatorios o los datos son inválidos.");
  }
};

const validarIdReceta = (id) => {
  let validar_id =
    !validator.isEmpty(id) && validator.isLength(id, { min: 24, max: 24 });

  if (!validar_id) {
    throw new Error("El ID de la receta no es válido.");
  }
};

// Exportar Validaciones
module.exports = {
  validarFuncionario,
  validarIdfuncionarios,
  validarmedicamento,
  validarIdmedicamento,
  validarReceta,
  validarIdReceta,
};
