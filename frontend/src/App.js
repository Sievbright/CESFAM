import { AdministrarStock } from "./components/Funcionarios/AdministrarStock";
import { GenerarInformes } from "./components/Funcionarios/GenerarInformes";
import { PrincipalFuncionario } from "./components/Funcionarios/PrincipalFuncionario";
import { RegistroEntregas } from "./components/Funcionarios/RegistroEntregas";
import { ReservasMedicamentos } from "./components/Funcionarios/ReservasMedicamentos";
import { RevisarPrescripciones } from "./components/Funcionarios/RevisarPrescripciones";
import { ModificarStock } from "./components/Funcionarios/ModificarStock";
import { BuscarMedicamentos } from "./components/Funcionarios/BuscarMedicamento";
import { Index } from "./components/MenuPrincipal";
import { PrincipalMedico } from "./components/Medicos/PrincipalMedico";
import { ConsultaStock } from "./components/Medicos/ConsultaStock";
import { EmitirReceta } from "./components/Medicos/EmitirReceta";
import { EmitirPrescripcion } from "./components/Medicos/EmitirPrescripcion";
import { ServicioMensajeria } from "./components/Mensajeria/ServicioMensajeria";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/principalfuncionario"
          element={<PrincipalFuncionario />}
        />
        <Route path="/generarinformes" element={<GenerarInformes />} />
        <Route path="/administrarstock" element={<AdministrarStock />} />
        <Route path="/registroentregas" element={<RegistroEntregas />} />
        <Route
          path="/reservasmedicamentos"
          element={<ReservasMedicamentos />}
        />
        <Route path="/modificarstock" element={<ModificarStock />} />
        <Route path="/buscar" element={<BuscarMedicamentos />} />
        <Route
          path="/revisarprescripciones"
          element={<RevisarPrescripciones />}
        />
        <Route path="/principalmedico" element={<PrincipalMedico />} />
        <Route path="/consultastock" element={<ConsultaStock />} />
        <Route path="/emitirreceta" element={<EmitirReceta />} />
        <Route path="/emitirprescripcion" element={<EmitirPrescripcion />} />
        <Route path="/serviciomensajeria" element={<ServicioMensajeria />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
