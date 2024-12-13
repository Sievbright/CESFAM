import React, { useState, useContext } from "react";
//import { MiContexto } from './MiContexto';

export const LoginUsuarioComponent = () => {
  let [usuarios, setUsuarios] = useState([]);
  const contexto = useContext(MiContexto);
  let [errores, setErrores] = useState("");
  let [usuarioLogeado, setUsuarioLogeado] = useState([]);

  const getUsuariosAjaxAsynAw = () => {
    setTimeout(async () => {
      try {
        const peticion = await fetch(
          "http://localhost:3500/api/funcionarios/listar"
        );
        const { resultado } = await peticion.json();
        setUsuarios(resultado);
        console.log(resultado);
      } catch (error) {
        setErrores(error.message);
      }
    }, 2000);
  };

  const validarUsuario = (e) => {
    if (e.target.ident.value && e.target.email.value) {
      getUsuariosAjaxAsynAw();
    }

    e.preventDefault();
    setUsuarios([]);
    setUsuarioLogeado([]);
    let usuario;
    for (let i = 0; i < usuarios.length; i++) {
      if (
        usuarios[i].username === e.target.ident.value &&
        usuarios[i].nombre_usuario === e.target.email.value
      ) {
        usuario = usuarios[i];
        setUsuarioLogeado(usuario);
        console.log("El usuario encontado es: ", usuario);
        break;
      }
    }
    //let usuario = usuarios.filter(usuarios => usuarios._id === parseInt(e.target.ident.value) && usuarios.nombre_usuario === e.target.email.value);
    if (usuarioLogeado) {
      setTimeout(() => {
        contexto.setUsuarioLogeado(usuarioLogeado);
      }, 3000);
    } else {
      setTimeout(() => {
        contexto.setUsuarioLogeado([]);
        setUsuarios([]);
      }, 2000);
    }
  };

  const cerrarSesion = () => {
    document.getElementsByName("ident")[0].value = "";
    document.getElementsByName("email")[0].value = "";
    console.log("Se cerro la sesión");
    setUsuarios([]);
    contexto.setUsuarioLogeado([]);
    setTimeout(() => {
      contexto.setUsuarioLogeado([]);
      setUsuarios([]);
    }, 2000);
  };

  return (
    <div className="login">
      <center>
        {errores.length > 0 && <h2>Error en la llamada o API no disponible</h2>}
        {contexto.usuarioLogeado ? (
          <h2>
            Usuario: {contexto.usuarioLogeado.nombres}{" "}
            {contexto.usuarioLogeado.apellido_paterno}
          </h2>
        ) : (
          <h2>Usuario no logeado o no existe</h2>
        )}
        <form onSubmit={validarUsuario} name="autenticacion">
          <input type="text" name="ident" placeholder="Ingrese el id" />
          <input type="email" name="email" placeholder="Ingrese el email" />
          <input type="submit" value="Iniciar sesión" />
        </form>
        <button onClick={cerrarSesion} name="cerrar">
          Cerrar sesión
        </button>
      </center>
    </div>
  );
};
