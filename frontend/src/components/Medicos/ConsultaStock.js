import React, { useState, useEffect } from "react";
import "./consultastock.css"; // Asegúrate de tener este archivo CSS
import { Link } from "react-router-dom";

export function ConsultaStock() {
  const [medicamento, setMedicamento] = useState("");
  const [medicamentos, setMedicamentos] = useState([]); // Lista de medicamentos
  const [stock, setStock] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Para el feedback visual
  const [isFormEnabled, setIsFormEnabled] = useState(true); // Para habilitar/deshabilitar el formulario
  const [error, setError] = useState(null); // Para mostrar mensajes de error

  // Cargar medicamentos desde la base de datos al montar el componente
  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const response = await fetch("http://localhost:3500/api/medicamentos/listar");
        if (!response.ok) {
          throw new Error("Error al cargar medicamentos. Intenta más tarde.");
        }
        const data = await response.json();
        setMedicamentos(data.medicamentos); // Suponiendo que el backend devuelve un array de medicamentos
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMedicamentos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!medicamento) {
      alert("Por favor, selecciona un medicamento.");
      return;
    }

    setIsLoading(true);
    setError(null); // Limpiar cualquier error anterior

    try {
      // Realizamos la solicitud al backend
      const response = await fetch(`http://localhost:3500/api/medicamentos/listaruno/${medicamento}`);

      if (!response.ok) {
        throw new Error("No se pudo obtener el stock. Intenta más tarde.");
      }

      const data = await response.json();
      console.log(data.cantidad);
      setStock(data.cantidad); // Suponiendo que la respuesta tiene un campo 'stock'
    } catch (error) {
      setError(error.message); // Manejamos cualquier error que ocurra
    } finally {
      setIsLoading(false); // Al finalizar la consulta
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <RevisarStock
        medicamento={medicamento}
        setMedicamento={setMedicamento}
        medicamentos={medicamentos}
        stock={stock}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isFormEnabled={isFormEnabled}
        error={error}
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
        <i className="material-icons">login</i>
      </header>
    </div>
  );
}

function RevisarStock({
  medicamento,
  setMedicamento,
  medicamentos,
  stock,
  handleSubmit,
  isLoading,
  isFormEnabled,
  error,
}) {
  return (
    <div className="consulta-stock">
      <br />
      <h2>Consulta de Stock</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="medicamento">Medicamento:</label>
        <select
          id="medicamento"
          name="medicamento"
          value={medicamento}
          onChange={(e) => setMedicamento(e.target.value)}
          disabled={!isFormEnabled}
        >
          <option value="">Seleccione un medicamento</option>
          {medicamentos.map((med) => (
            <option key={med._id} value={med._id}>
              {med.nombre}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button type="submit" disabled={!isFormEnabled || isLoading}>
          {isLoading ? "Consultando..." : "Consultar"}
        </button>
      </form>
      {isLoading && <div className="spinner">Cargando...</div>}
      {error && <div className="error">{error}</div>}{" "}
      {/* Mostrar errores si los hay */}
      {stock !== null && !isLoading && (
        <div>
          <h3>Stock disponible: {stock}</h3>
        </div>
      )}
      <div id="resultado"></div>
    </div>
  );
}
