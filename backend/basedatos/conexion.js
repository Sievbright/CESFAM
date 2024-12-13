// Es como realizar un import, aquí añadimos o incorporamos el ORM mongoose
// al archivo conexion.js
const mongoose = require("mongoose");

const conexion = async () => {
  try {
    await mongoose.connect("mongodb+srv://Admin123:Admin123@cluster0.zh8un.mongodb.net/cesfam?retryWrites=true&w=majority");


    // Parametros dentro de objeto // solo en caso de aviso
    // useNewUrlParser: true
    // useUnifiedTopology: true
    // useCreateIndex: true

    console.log("Conectado correctamente a la base de datos Tarea3 !!");
  } catch (error) {
    console.log(error);
    throw new Error("No se ha podido conectar a la base de datos !!");
  }
};

module.exports = {
  conexion,
};
