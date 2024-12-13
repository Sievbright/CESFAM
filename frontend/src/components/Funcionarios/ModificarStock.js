import React, { useState, useEffect } from "react";
import "./administrarStock.css";
import { Link } from "react-router-dom";

export function ModificarStock() {
  return (
    <div className="wrapper">
      <Header />
      <GestionarStock />
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

function GestionarStock() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [medicamentoEdit, setMedicamentoEdit] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    console.log("Cargando medicamentos...");
    fetch("http://localhost:3500/api/medicamentos")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Datos recibidos del backend:", data);
        if (Array.isArray(data)) {
          setMedicamentos(data);
        } else {
          console.error("La respuesta no es un array:", data);
          setMedicamentos([]);
        }
      })
      .catch((error) => console.error("Error al cargar medicamentos:", error))
      .finally(() => setCargando(false));
  }, []);

  const guardarCambios = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3500/api/medicamentos/editar/${medicamentoEdit._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cantidad: medicamentoEdit.cantidad }),
        }
      );

      if (response.ok) {
        setMensaje("Stock actualizado correctamente.");
        setMedicamentoEdit(null);
        setMedicamentos((prev) =>
          prev.map((med) =>
            med._id === medicamentoEdit._id
              ? { ...med, cantidad: medicamentoEdit.cantidad }
              : med
          )
        );
      } else {
        setMensaje("Error al actualizar el stock.");
      }
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
      setMensaje("Error al conectar con el servidor.");
    }
  };

  if (cargando) {
    return <p>Cargando medicamentos...</p>;
  }

  return (
    <div className="container mt-4">
      <h3>Modificar Stock</h3>
      {mensaje && <p className="alert alert-info mt-3">{mensaje}</p>}

      {medicamentoEdit ? (
        <form onSubmit={guardarCambios} className="mt-4">
          <h5>Actualizar Stock</h5>
          <div className="mb-3">
            <label className="form-label">Nombre del Medicamento:</label>
            <input
              type="text"
              className="form-control"
              value={medicamentoEdit.nombre}
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Cantidad:</label>
            <input
              type="number"
              className="form-control"
              value={medicamentoEdit.cantidad}
              onChange={(e) =>
                setMedicamentoEdit({
                  ...medicamentoEdit,
                  cantidad: e.target.value,
                })
              }
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Guardar Cambios
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => setMedicamentoEdit(null)}
          >
            Cancelar
          </button>
        </form>
      ) : (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Dosis</th>
              <th>Forma</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.map((med) => (
              <tr key={med._id}>
                <td>{med.nombre}</td>
                <td>{med.dosis}</td>
                <td>{med.forma}</td>
                <td>{med.cantidad}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => setMedicamentoEdit(med)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
