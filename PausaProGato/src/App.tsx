import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Cabecalho from "./componentes/Cabecalho/Cabecalho";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import FAQ from "./pages/Faq/Faq";
import Contato from "./pages/Contato/Contato";
import Sobre from "./pages/Sobre/Sobre";
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
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
