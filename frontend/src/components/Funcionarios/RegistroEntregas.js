import React from "react";
import "./registroEntregas.css";
import { Link } from "react-router-dom";

export function RegistroEntregas() {
  return (
    <div className="wrapper">
      <Header />
      <MostrarEntregas />
      <Footer />
    </div>
  );
}

function MostrarEntregas() {
  return (
    <div className="bloque-principal">
      <p>
        <h1 className="titulo_main">Resgistro de entregas</h1>
        <img src="/img/entregas.png" class="center" />
      </p>
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
