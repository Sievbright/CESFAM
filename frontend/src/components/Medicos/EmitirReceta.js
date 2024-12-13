import React from "react";
import "./emitirreceta.css";
import { Link } from "react-router-dom";

export function EmitirReceta() {
  return (
    <div className="wrapper">
      <Header />
      <Receta />
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

function Receta() {
  return (
    <div className="RecetaMedica">
      <main>
        <div className="titulo_main">Emitir Receta Médica</div>
        <form>
          <label htmlFor="paciente">Paciente</label>
          <input
            type="text"
            id="paciente"
            name="paciente"
            value="Nombre del Paciente"
            disabled
          />

          <label htmlFor="receta">Receta</label>
          <input
            type="text"
            id="receta"
            name="receta"
            value="Descripción de la Receta"
            disabled
          />

          <button type="submit" disabled>
            Emitir Receta
          </button>
        </form>
      </main>
    </div>
  );
}
