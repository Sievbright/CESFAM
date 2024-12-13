import React, { useState } from "react";
import "./menuPrincipal.css";
import { Link, useNavigate } from "react-router-dom";

export function Index() {
  return (
    <div className="wrapper">
      <Header />
      <SeccionPrincipal />
      <Footer />
    </div>
  );
}
// usuario funcionario vang12321 weqr123, medico man200 qwer1234
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
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

function SeccionPrincipal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrores("Por favor, ingresa el nombre de usuario y la contraseña.");
      return;
    }

    setErrores("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3500/api/funcionarios/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const { cargo } = data;
        if (cargo === "médico") {
          navigate("/principalmedico");
        } else {
          navigate("/principalfuncionario");
        }
      } else {
        setErrores(data.mensaje || "Credenciales incorrectas.");
      }
    } catch (error) {
      setErrores("Error al realizar la solicitud. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bloque-principal">
      <h1 className="titulo_main text-center">Sistema de Farmacia CESFAM</h1>

      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-4">
            <div className="card" style={{ width: "400px" }}>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <h3 className="subtitulo">Inicio de sesión</h3>
                    <label
                      htmlFor="exampleInputUsername"
                      className="form-label"
                    >
                      Nombre de usuario
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputUsername"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary me-3"
                    disabled={loading}
                  >
                    {loading ? "Cargando..." : "Ingresar"}
                  </button>
                </form>
                {errores && <p className="text-danger mt-2">{errores}</p>}
              </div>
            </div>
          </div>
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
