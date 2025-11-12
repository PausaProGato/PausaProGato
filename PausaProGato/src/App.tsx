import { BrowserRouter, Route, Routes } from "react-router-dom" 
import Cabecalho from "./componentes/Cabecalho/Cabecalho"
import Home from "./pages/Home/Home"
import Faq from "./pages/Faq/Faq"
import Sobre from "./pages/Sobre/Sobre"
import Contato from "./pages/Contato/Contato"
import Footer from "./componentes/Footer/Footer"
import Login from "./pages/Login/Login"

function App() {

  return (
    <>
    <div className="min-h-screen flex flex-col bg-orange-100">
    <BrowserRouter>
    <Cabecalho />
    <main className="p-4">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/sobre" element={<Sobre />} /> 
        <Route path="/faq" element={<Faq />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </main>
    </BrowserRouter>
    <Footer />
    </div>
    </>
  )
}

export default App