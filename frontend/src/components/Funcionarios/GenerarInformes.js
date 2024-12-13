import React from "react";
import "./generarInformes.css";
import { Link } from "react-router-dom";

export function GenerarInformes() {
  return (
    <div className="wrapper">
      <Header />
      <TextoTítulo />
      <RecuadrosStock />
      <Footer />
    </div>
  );
}

function TextoTítulo() {
  return (
    <div className="container text-center">
      <h1 className="titulo_main">Generación de informes</h1>
    </div>
  );
}

function RecuadrosStock() {
  return (
    <div className="bloque-principal">
      <div className="container text-center">
        <div className="row">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Estado del stock</h5>
                <p className="card-text">
                  Información acerca del estado y disponibilidad de los
                  medicamentos a detalle.
                </p>
                <Link
                  to="/informes/informe_stock.pdf"
                  target="_blank"
                  className="btn btn-success"
                >
                  Generar informe de Stock
                </Link>
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Medicamentos reservados</h5>
                <p className="card-text">
                  Informe de todos las reservas registradas de medicamentos
                  hasta la fecha.
                </p>
                <Link
                  to="/informes/informe_reservados.pdf"
                  target="_blank"
                  className="btn btn-success"
                >
                  Generar informe de medicamentos reservados
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
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
