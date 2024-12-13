const Funcionario = require("../modelos/funcionarios");
const {
  validarFuncionario,
  validarIdfuncionarios,
} = require("../util/validar");
const bcrypt = require("bcrypt");

// Crear un nuevo funcionario
const crearfuncionario = async (req, res) => {
  let parametros = req.body;

  console.log("Datos recibidos:", parametros);

  try {
    validarFuncionario(parametros); // Validación antes de guardar
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Datos inválidos o incompletos: " + error.message,
    });
  }

  try {
    // Hashear la contraseña antes de guardar
    if (parametros.password) {
      parametros.password = await bcrypt.hash(parametros.password, 10); // 10 es el número de "salt rounds"
    }

    // Crear un nuevo funcionario
    const nuevoFuncionario = new Funcionario(parametros);
    await nuevoFuncionario.save(); // Guarda el funcionario en la base de datos
    return res.status(200).json({
      status: "éxito",
      funcionario: parametros,
      mensaje: "Funcionario creado con éxito!",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      mensaje: "Error al crear el funcionario: " + error.message,
    });
  }
};

// Listar todos los funcionarios
const listar = async (req, res) => {
  try {
    const usuarios = await Funcionario.find();

    res.status(200).json({
      message: "Lista de medicamentos obtenida con exito",
      usuarios,
    });
  } catch (error) {
    console.error("Error al listar medicamentos:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los medicamentos. Por favor, intente más tarde.",
    });
  }
};

// Listar un funcionario por ID
const listarUno = async (req, res) => {
  let id = req.params.id;
  try {
    validarIdfuncionarios(id);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Id con formato incorrecto",
    });
  }

  try {
    let resultado = await Funcionario.findById(id);
    if (!resultado) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se ha encontrado el funcionario",
      });
    } else {
      return res.status(200).json({
        status: "éxito",
        resultado,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "No se ha encontrado el funcionario",
    });
  }
};

// Borrar un funcionario
const borrar = async (req, res) => {
  try {
    let funcionariosId = req.params.id;
    validarIdfuncionarios(funcionariosId);
    let resultado = await Funcionario.findOneAndDelete({ _id: funcionariosId });
    if (!resultado) {
      return res.status(404).json({
        status: "error",
        mensaje: "Funcionario no encontrado",
      });
    } else {
      return res.status(200).json({
        status: "éxito",
        funcionario: resultado,
        mensaje: "Funcionario borrado",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "No se ha podido borrar el funcionario",
    });
  }
};

// Editar un funcionario
const editar = async (req, res) => {
  let funcionariosId = req.params.id;
  let parametros = req.body;

  try {
    validarFuncionario(parametros);
    let resultado = await Funcionario.findOneAndUpdate(
      { _id: funcionariosId },
      parametros,
      { new: true }
    );
    if (!resultado) {
      return res.status(404).json({
        status: "error",
        mensaje: "Funcionario no encontrado",
      });
    } else {
      return res.status(200).json({
        status: "éxito",
        funcionario: resultado,
        mensaje: "Funcionario actualizado!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Error al actualizar el funcionario",
    });
  }
};

// Buscar funcionarios
const buscador = async (req, res) => {
  let busqueda = req.params.busqueda;

  try {
    let resultado = await Funcionario.find({
      $or: [
        { titulo: { $regex: busqueda, $options: "i" } },
        { contenido: { $regex: busqueda, $options: "i" } },
      ],
    }).sort({ fecha: -1 });

    if (!resultado || resultado.length <= 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado funcionarios",
      });
    } else {
      return res.status(200).json({
        status: "éxito",
        funcionarios: resultado,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Error al buscar funcionarios",
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar el usuario por nombre de usuario
    const usuario = await Funcionario.findOne({ username });

    if (!usuario) {
      return res.status(401).json({ mensaje: "Usuario no encontrado." });
    }

    // Validar contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta." });
    }

    // Devolver información del usuario
    res.status(200).json({ mensaje: "Login exitoso.", cargo: usuario.cargo });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ mensaje: "Error del servidor." });
  }
};

module.exports = {
  crearfuncionario,
  listar,
  listarUno,
  borrar,
  editar,
  buscador,
  login,
};
