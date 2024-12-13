import React, { useState, useEffect } from "react";
import "./administrarStock.css";
import { Link } from "react-router-dom";

export function BuscarMedicamentos() {
  return (
    <div className="wrapper">
      <Header />
      <Buscar />
    </div>
  );
}

function Header() {
  return (
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
  );
}

function Buscar() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3500/api/medicamento")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setMedicamentos(data);
        } else {
          console.error("Formato de datos inesperado:", data);
          setError("La respuesta de la API no contiene una lista válida.");
        }
      })
      .catch((error) => {
        console.error("Error al cargar medicamentos:", error);
        setError(`No se pudieron cargar los medicamentos: ${error.message}`);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!busqueda.trim()) {
      setResultados([]);
      return;
    }

    const resultadosFiltrados = medicamentos.filter(
      (med) =>
        med.nombre && med.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setResultados(resultadosFiltrados);
  };

  return (
    <div className="container mt-4">
      <h3>Buscar Medicamentos</h3>
      <form onSubmit={handleSearch} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Nombre del Medicamento:</label>
          <input
            type="text"
            className="form-control"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Ingrese el nombre del medicamento"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
      </form>

      {error && <p className="alert alert-danger mt-3">{error}</p>}

      {resultados.length > 0 && (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Dosis</th>
              <th>Forma</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((med) => (
              <tr key={med._id}>
                <td>{med.nombre}</td>
                <td>{med.dosis}</td>
                <td>{med.forma}</td>
                <td>{med.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {resultados.length === 0 && busqueda && !error && (
        <p className="alert alert-warning mt-3">
          No se encontraron resultados.
        </p>
      )}
    </div>
  );
}
