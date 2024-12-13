import React from "react";
import "./principalmedico.css";
import { Link } from "react-router-dom";

export function PrincipalMedico() {
  return (
    <div className="wrapper">
      <Header />
      <BloquePrincipal />
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
        <i class="material-icons">login</i>
      </header>
    </div>
  );
}

function BloquePrincipal() {
  return (
    <div className="bloque-principal">
      <div>
        <h1 className="titulo_main"> Bienvenido, funcionario</h1>
        <div className="centrar">
          <p>
            <blockquote>
              <table>
                <tr>
                  <td>
                    <Link to="/consultastock">Consultar Stock</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/emitirprescripcion">Emitir Prescripcion</Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link to="/serviciomensajeria">Servicio de Mensajeria</Link>
                  </td>
                </tr>
              </table>
            </blockquote>
          </p>
        </div>
      </div>
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
