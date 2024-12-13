import React from "react";
import "./reservasMedicamentos.css";
import { Link } from "react-router-dom";

export function ReservasMedicamentos() {
  return (
    <div className="wrapper">
      <Header />
      <Titulo />
      <Formulario />
      <Footer />
    </div>
  );
}

function Formulario() {
  return (
    <div className="bloque-principal">
      <div className="formulario-container">
        <form>
          <div className="form-group">
            <label for="carnet">
              <b>RUT/Pasaporte del paciente</b>
            </label>{" "}
            <br />
            <input
              type="text"
              className="form-control"
              id="carnet"
              placeholder="00.000.000-0"
            />
          </div>{" "}
          <br />
          <div className="form-group">
            <label for="correo">
              <b>Correo electrónico del paciente</b>
            </label>{" "}
            <br />
            <input
              type="email"
              className="form-control"
              id="correo"
              placeholder="cliente@correo.com"
            />
          </div>{" "}
          <br />
          <div className="form-group">
            <label for="fecha">
              <b>Fecha de emisión</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="fecha"
              placeholder="DD/MM/YY"
            />
          </div>{" "}
          <br />
          <div className="form-group">
            <label for="doctor">
              <b>Profesional a cargo</b>
            </label>
            <input
              type="text"
              className="form-control"
              id="doctor"
              placeholder="--"
            />
          </div>{" "}
          <br />
          <div className="form-group">
            <label for="medicamento">
              <b>Medicamento</b>
            </label>
            <select className="form-control" id="medicamento">
              <option>Medicamento 1</option>
              <option>Medicamento 2</option>
            </select>
          </div>{" "}
          <br />
          <div className="form-group">
            <label for="dosis">
              <b>Dosis</b>
            </label>
            <input type="text" className="form-control" id="dosis" />
          </div>{" "}
          <br />
          <div className="form-group">
            <label for="cantidad">
              <b>Cantidad de unidades</b>
            </label>
            <input type="number" className="form-control" id="cantidad" />
          </div>{" "}
          <br />
          <div className="form-group">
            <label for="observaciones">
              <b>Observaciones</b>
            </label>
            <textarea
              className="form-control"
              id="observaciones"
              rows="2"
            ></textarea>
          </div>{" "}
          <br />
          <button type="submit" className="btn btn-primary">
            Confirmar reserva
          </button>
        </form>
      </div>
    </div>
  );
}

function Titulo() {
  return (
    <div className="container">
      <h1 className="titulo_main">Ingreso de nueva reserva</h1>
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

function Footer() {
  return (
    <div>
      <footer className="text-center mt-4">
        <p>&copy; 2024 CESFAM</p>
      </footer>
    </div>
  );
}
