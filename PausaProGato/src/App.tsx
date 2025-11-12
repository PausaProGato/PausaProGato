import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Cabecalho from "./componentes/Cabecalho/Cabecalho";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import FAQ from "./pages/Faq/Faq";
import Contato from "./pages/Contato/Contato";
import Sobre from "./pages/Sobre/Sobre";
import Api from "./pages/paginaParaAPI/Api"
import RecursosAjuda from "./pages/Recursos/Recursos-ajuda";
import Humor from "./pages/Check-inHumor/Humor"
import Footer from "./componentes/Footer/Footer";


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const hideLayout = ["/"].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Cabecalho />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contato" element={<Contato/>} />
        <Route path="/sobre" element={<Sobre/>} />
        <Route path="/checkin" element={<Humor />}/>
        <Route path="/api" element={<Api />} />
        <Route path="/recursos" element={<RecursosAjuda />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
