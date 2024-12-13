const Receta = require("../modelos/recetas");
const { validarReceta, validarIdreceta } = require("../util/validar");

// Crear receta
const crearReceta = async (req, res) => {
  const parametros = req.body;

  // Validar datos antes de guardar
  try {
    // Aquí puedes agregar validaciones adicionales si es necesario
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar o datos inválidos.",
    });
  }

  try {
    const nuevaReceta = new Receta(parametros);
    await nuevaReceta.save();
    return res.status(200).json({
      status: "éxito",
      receta: parametros,
      mensaje: "Receta creada con éxito!",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      mensaje: "Error al crear la receta",
    });
  }
};

// Listar todas las recetas
const listar = async (req, res) => {
  try {
    const recetas = await Receta.find();
    return res.status(200).json({
      status: "éxito",
      recetas,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      mensaje: "Error al obtener las recetas.",
    });
  }
};

// Obtener una receta por ID (listarUno)
const listarUno = async (req, res) => {
  const { id } = req.params;

  try {
    const receta = await Receta.findById(id);

    if (!receta) {
      return res.status(404).json({
        status: "error",
        mensaje: "Receta no encontrada.",
      });
    }

    return res.status(200).json({
      status: "éxito",
      receta,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      mensaje: "Error al obtener la receta.",
    });
  }
};

// Obtener una receta por ID
const buscador = async (req, res) => {
  const { id } = req.params;

  try {
    const receta = await Receta.findById(id);

    if (!receta) {
      return res.status(404).json({
        status: "error",
        mensaje: "Receta no encontrada.",
      });
    }

    return res.status(200).json({
      status: "éxito",
      receta,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      mensaje: "Error al obtener la receta.",
    });
  }
};

// Editar una receta
const editar = async (req, res) => {
  const { id } = req.params;
  const parametros = req.body;

  try {
    const recetaEditada = await Receta.findByIdAndUpdate(id, parametros, {
      new: true, // Devuelve el documento actualizado
    });

    if (!recetaEditada) {
      return res.status(404).json({
        status: "error",
        mensaje: "Receta no encontrada.",
      });
    }

    return res.status(200).json({
      status: "éxito",
      receta: recetaEditada,
      mensaje: "Receta editada con éxito.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      mensaje: "Error al editar la receta.",
    });
  }
};

// Eliminar una receta
const borrar = async (req, res) => {
  const { id } = req.params;

  try {
    const recetaEliminada = await Receta.findByIdAndDelete(id);

    if (!recetaEliminada) {
      return res.status(404).json({
        status: "error",
        mensaje: "Receta no encontrada.",
      });
    }

    return res.status(200).json({
      status: "éxito",
      mensaje: "Receta eliminada con éxito.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      mensaje: "Error al eliminar la receta.",
    });
  }
};

module.exports = {
  crearReceta,
  listar,
  listarUno,
  editar,
  borrar,
  buscador,
};
