import React, { useState } from "react";
import "./emitirprescripcion.css";
import { Link } from "react-router-dom";

export function EmitirPrescripcion() {
  return (
    <div className="wrapper">
      <Header />
      <Formulario />
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
                  Cerrar Sesión
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

function Formulario() {
  const [formData, setFormData] = useState({
    paciente: "",
    rut: "",
    correo: "",
    fecha_emision: "",
    medicamentos: "",
    dosis: "",
    fecha_termino: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3500/api/recetas/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensaje("Prescripción emitida correctamente.");
        setFormData({
          paciente: "",
          rut: "",
          correo: "",
          fecha_emision: "",
          medicamentos: "",
          dosis: "",
          fecha_termino: "",
        });
      } else {
        setMensaje("Error al emitir la prescripción.");
      }
    } catch (error) {
      console.error("Error al emitir la prescripción:", error);
      setMensaje("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="container">
      <main>
        <div className="titulo_main">Emitir Prescripción</div>
        {mensaje && <p className="alert alert-info mt-3">{mensaje}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="paciente">Paciente</label>
          <input
            type="text"
            id="paciente"
            name="paciente"
            value={formData.paciente}
            onChange={handleChange}
            required
          />

          <label htmlFor="rut">RUT</label>
          <input
            type="text"
            id="rut"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            required
          />

          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />

          <label htmlFor="fecha_emision">Fecha de Emisión</label>
          <input
            type="date"
            id="fecha_emision"
            name="fecha_emision"
            value={formData.fecha_emision}
            onChange={handleChange}
            required
          />

          <label htmlFor="medicamentos">Medicamentos</label>
          <textarea
            id="medicamentos"
            name="medicamentos"
            rows="2"
            value={formData.medicamentos}
            onChange={handleChange}
            required
          ></textarea>

          <label htmlFor="dosis">Dosis</label>
          <textarea
            id="dosis"
            name="dosis"
            rows="2"
            value={formData.dosis}
            onChange={handleChange}
            required
          ></textarea>

          <label htmlFor="fecha_termino">Fecha de Término</label>
          <input
            type="date"
            id="fecha_termino"
            name="fecha_termino"
            value={formData.fecha_termino}
            onChange={handleChange}
            required
          />

          <button type="submit">Emitir Prescripción</button>
        </form>
      </main>
    </div>
  );
}
