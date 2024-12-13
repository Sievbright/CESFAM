import React, { useState } from "react";
import "./serviciomensajeria.css";
import { Link } from "react-router-dom";

export function ServicioMensajeria() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation - you can add more robust validation if needed
    if (nombre.trim() === "" || email.trim() === "" || mensaje.trim() === "") {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Here you would typically send the data to a server using an API call (e.g., fetch or axios)
    // For this example, we'll just log the data to the console
    console.log("Nombre:", nombre);
    console.log("Email:", email);
    console.log("Mensaje:", mensaje);

    // Optionally, you can clear the form fields after submission
    setNombre("");
    setEmail("");
    setMensaje("");
  };

  return (
    <div className="servicio-mensajeria">
      <Header />
      <Formulario
        nombre={nombre}
        setNombre={setNombre}
        email={email}
        setEmail={setEmail}
        mensaje={mensaje}
        setMensaje={setMensaje}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}


function Header() {
    return (
      <div>
        <header>
          <div>
            <p>
              <b>CESFAM</b>
            </p>
            <nav className="navbar">
              <ul className="menu">
                <li>
                  <Link className="menu-link" to="/principalfuncionario">
                    Funcionario
                  </Link>
                </li>
                <li>
                  <Link className="menu-link" to="/principalmedico">
                    Médico
                  </Link>
                </li>
                <li>
                  <Link className="menu-link" to="#">
                    Acerca de
                  </Link>
                </li>
                <li>
                  <Link className="menu-link" to="/">
                    Iniciar Sesión
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <i class="material-icons">login</i>
        </header>
      </div>
    );
  }

function Formulario({
  nombre,
  setNombre,
  email,
  setEmail,
  mensaje,
  setMensaje,
  handleSubmit,
}) {
  return (
    <div className="container">
      <main>
        <div className="titulo_main">Formulario de Mensajería</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required 
            />
          </div>

          <div>
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="4"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit">Enviar</button>
        </form>
      </main>
    </div>
  );
}