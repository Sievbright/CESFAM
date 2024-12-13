# Proyecto CESFAM

## Descripción
El proyecto CESFAM es una aplicación web diseñada para la gestión eficiente de medicamentos, usuarios y consultas en un centro de salud familiar (CESFAM). Este sistema busca facilitar el trabajo del personal médico y administrativo mediante funcionalidades que permiten consultar el stock de medicamentos, gestionar usuarios y sus roles, y realizar otras operaciones relacionadas con la atención médica.

## Características principales

### Gestión de medicamentos
- Registro, actualización y eliminación de medicamentos.
- Consulta de stock por nombre de medicamento.
- Listado completo de medicamentos disponibles.

### Gestión de usuarios
- Registro de usuarios con roles definidos (médico o funcionario).
- Autenticación segura mediante credenciales (nombre de usuario y contraseña).
- Gestión de roles para delimitar permisos y funcionalidades.

### Consultas de stock
- Consulta rápida y precisa del stock disponible de un medicamento.
- Interfaz intuitiva para seleccionar medicamentos desde un listado dinámico cargado desde la base de datos.

### Funcionalidades administrativas
- Interfaz separada para médicos y funcionarios.
- Navegación sencilla para acceder a funcionalidades específicas según el rol.

## Tecnologías utilizadas

### Frontend
- **React**: Para construir una interfaz de usuario interactiva y dinámica.
- **CSS**: Para estilizar y garantizar una experiencia visual consistente.

### Backend
- **Node.js y Express**: Para manejar la lógica del servidor y las rutas de la API.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar información de medicamentos y usuarios.

### Herramientas adicionales
- **Visual Studio Code**: Editor de código principal.
- **Postman**: Para pruebas de la API.

## Instalación

### Requisitos previos
- Node.js (versión 14 o superior).
- MongoDB (instancia local o en la nube).

### Pasos
1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   ```
2. Navegar al directorio del proyecto:
   ```bash
   cd cesfam
   ```
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Configurar variables de entorno:
   - Crear un archivo `.env` en la raíz del proyecto.
   - Añadir las siguientes variables:
     ```
     PORT=3500
     MONGO_URI=mongodb://localhost:27017/cesfam
     ```
5. Iniciar el servidor:
   ```bash
   npm start
   ```

6. Acceder a la aplicación:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:3500/api](http://localhost:3500/api)

## Uso
1. Iniciar sesión con credenciales de usuario (médico o funcionario).
2. Consultar stock de medicamentos desde el módulo correspondiente.
3. Registrar, actualizar o eliminar medicamentos desde la interfaz administrativa.

## Contribuciones
Las contribuciones son bienvenidas. Por favor, crea un pull request con cambios bien documentados y asegúrate de que el proyecto se mantenga funcional.

## Contacto
Para consultas o soporte, por favor, contacta al equipo de desarrollo en [correo@cesfam.com](mailto:correo@cesfam.com).
