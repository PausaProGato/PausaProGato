import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/theme-provider";
import Cabecalho from "./componentes/Cabecalho/Cabecalho";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import FAQ from "./pages/Faq/Faq";
import Integrantes from "./pages/Integrantes/Integrantes";
import Sobre from "./pages/Sobre/Sobre";
import RegistroDiarioPage from "./pages/RegistroDiario/Registro";
import RecursosAjuda from "./pages/Recursos/Recursos-ajuda";
import Humor from "./pages/Check-inHumor/Humor";
import HumorHistorico from "./pages/HistoricoHumor/HumorHistorico";
import HumorDetalhes from "./pages/DetalhesHumor/HumorDetalhes";
import Contato from "./pages/Contato/Contato";
import Footer from "./componentes/Footer/Footer";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const hideLayoutRoutes = ["/"]; 
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="transition-colors duration-300 min-h-screen">
      {!hideLayout && <Cabecalho />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/humor/checkin" element={<Humor />} />
        <Route path="/humor/checkin/:timestamp" element={<Humor />} />
        <Route path="/humor/detalhes/:timestamp" element={<HumorDetalhes />} />
        <Route path="/humor/historico" element={<HumorHistorico />} />
        <Route path="/humor/historico/:periodo" element={<HumorHistorico />} />
        <Route path="/registro" element={<RegistroDiarioPage />} />
        <Route path="/recursos" element={<RecursosAjuda />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
