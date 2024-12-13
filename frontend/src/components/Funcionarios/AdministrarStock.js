import React, { useState } from "react";
import "./administrarStock.css";
import { Link } from "react-router-dom";

export function AdministrarStock() {
  return (
    <div className="wrapper">
      <Header />
      <InteractuarStock />
      <FormularioCrearMedicamento />
      <Footer />
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
        <i className="material-icons">login</i>
      </header>
    </div>
  );
}

function InteractuarStock() {
  return (
    <div className="container text-center">
      <h1 className="titulo_main">Administración de stock de farmacia</h1>{" "}
      <br />
      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Modificar</h5>
              <p className="card-text">
                Actualizar la disponibilidad de los medicamentos de acuerdo a
                los últimos movimientos.
              </p>
              <Link to="/ModificarStock" className="btn btn-success">
                Modificar Stock
              </Link>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Consultar</h5>
              <p className="card-text">
                Acceder al stock para informarse del estado, disponibilidad y
                detalles de medicamentos específicos.
              </p>
              <Link to="/buscar" className="btn btn-success">
                Buscar Medicamentos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormularioCrearMedicamento() {
  const [medicamento, setMedicamento] = useState({
    nombre: "",
    dosis: "",
    forma: "",
    cantidad: "",
    fecha_expiracion: "",
    proveedor: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicamento({ ...medicamento, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3500/api/medicamentos/crear",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(medicamento),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMensaje("Medicamento creado exitosamente.");
        setMedicamento({
          nombre: "",
          dosis: "",
          forma: "",
          cantidad: "",
          fecha_expiracion: "",
          proveedor: "",
        });
      } else {
        setMensaje(data.mensaje || "Error al crear el medicamento.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Crear nuevo medicamento</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={medicamento.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dosis:</label>
          <input
            type="text"
            className="form-control"
            name="dosis"
            value={medicamento.dosis}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Forma:</label>
          <input
            type="text"
            className="form-control"
            name="forma"
            value={medicamento.forma}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cantidad:</label>
          <input
            type="number"
            className="form-control"
            name="cantidad"
            value={medicamento.cantidad}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de expiración:</label>
          <input
            type="date"
            className="form-control"
            name="fecha_expiracion"
            value={medicamento.fecha_expiracion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Proveedor:</label>
          <input
            type="text"
            className="form-control"
            name="proveedor"
            value={medicamento.proveedor}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Crear
        </button>
      </form>
      {mensaje && <p className="mt-3">{mensaje}</p>}
    </div>
  );
}

function Footer() {
  return (
    <div>
      <footer className="text-center mt-4">
        <p>&copy; 2024 CESFAM</p>
      </footer>
    </div>
  );
}
