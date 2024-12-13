const Medicamento = require("../modelos/Medicamento");
const { validarmedicamento, validarIdmedicamento } = require("../util/validar");

// Crear un nuevo medicamento
const crearMedicamento = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { nombre, dosis, forma, cantidad, fecha_expiracion, proveedor } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !dosis || !forma || !cantidad || !fecha_expiracion || !proveedor) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios." });
    }

    // Crear un nuevo medicamento
    const nuevoMedicamento = new Medicamento({
      nombre,
      dosis,
      forma,
      cantidad,
      fecha_expiracion,
      proveedor,
    });

    // Guardar el medicamento en la base de datos
    const medicamentoGuardado = await nuevoMedicamento.save();

    // Responder con el medicamento creado
    res.status(201).json({
      mensaje: "Medicamento creado exitosamente.",
      medicamento: medicamentoGuardado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el medicamento." });
  }
};

// Listar todos los medicamentos
const listar = async (req, res) => {
  try {
    const medicamentos = await Medicamento.find();
    console.log("Medicamentos encontrados:", medicamentos);

    res.status(200).json({
      message: "Lista de medicamentos obtenida con exito",
      medicamentos,
    });
  } catch (error) {
    console.error("Error al listar medicamentos:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los medicamentos. Por favor, intente más tarde.",
    });
  }
};


// Listar un medicamento por ID
const listar_uno = async (req, res) => {
  let id = req.params.id;
  try {
    validarIdmedicamento(id);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Id con formato incorrecto",
    });
  }

  try {
    let resultado = await Medicamento.findById(id);
    if (!resultado) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se ha encontrado el medicamento",
      });
    } else {
      return res.status(200).json({
        status: "success",
        cantidad: resultado.cantidad,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "No se ha encontrado el medicamento",
    });
  }
};

// Borrar un medicamento
const borrar = async (req, res) => {
  try {
    let medicamentoId = req.params.id;
    validarIdmedicamento(medicamentoId);
    let resultado = await Medicamento.findOneAndDelete({ _id: medicamentoId });
    if (!resultado) {
      return res.status(404).json({
        status: "error",
        mensaje: "Medicamento no encontrado",
      });
    } else {
      return res.status(200).json({
        status: "éxito",
        medicamento: resultado,
        mensaje: "Medicamento borrado",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "No se ha podido borrar el medicamento",
    });
  }
};

// Editar un medicamento
const editar = async (req, res) => {
  let medicamentoId = req.params.id;
  let parametros = req.body;

  try {
    validarmedicamento(parametros);
    let resultado = await Medicamento.findOneAndUpdate(
      { _id: medicamentoId },
      parametros,
      { new: true }
    );
    if (!resultado) {
      return res.status(404).json({
        status: "error",
        mensaje: "Medicamento no encontrado",
      });
    } else {
      return res.status(200).json({
        status: "éxito",
        medicamento: resultado,
        mensaje: "Medicamento actualizado!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Error al actualizar el medicamento",
    });
  }
};

// Buscar medicamentos
const buscador = async (req, res) => {
  let busqueda = req.params.busqueda;

  try {
    let resultado = await Medicamento.find({
      $or: [
        { nombre: { $regex: busqueda, $options: "i" } },
        { descripcion: { $regex: busqueda, $options: "i" } },
      ],
    }).sort({ fecha: -1 });

    if (!resultado || resultado.length <= 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado medicamentos",
      });
    } else {
      return res.status(200).json({
        status: "éxito",
        medicamentos: resultado,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Error al buscar medicamentos",
    });
  }
};

// Exportar las funciones
module.exports = {
  crearMedicamento,
  listar,
  listar_uno,
  borrar,
  editar,
  buscador,
};
