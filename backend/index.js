require("dotenv").config();
const { conexion } = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");

// Inicializar app
console.log("App de Node arrancada");

// Conectar a la base de datos
conexion();

// Crear servidor Node
const app = express();
const puerto = process.env.PORT || 3500;

// Configurar CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Cambia esto según tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true, // Permitir cookies y credenciales
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Manejo de solicitudes preflight

// Middleware para convertir el body a objetos JS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const rutas_funcionarios = require("./rutas/funcionarios");
const rutas_medicamentos = require("./rutas/medicamento");
const rutas_recetas = require("./rutas/recetas");

// Rutas iniciales
app.get("/", (req, res) => {
    return res
        .status(200)
        .send("<h1>Empezando a crear un API REST con Node.js</h1>");
});

// Registrar las rutas
app.use("/api/funcionarios", rutas_funcionarios);
app.use("/api/medicamentos", rutas_medicamentos);
app.use("/api/recetas", rutas_recetas);

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        mensaje: "Ruta no encontrada",
    });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
    console.error("Error no controlado:", err);
    res.status(500).json({
        status: "error",
        mensaje: "Error interno del servidor",
    });
});

// Crear servidor y escuchar peticiones HTTP
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
});
