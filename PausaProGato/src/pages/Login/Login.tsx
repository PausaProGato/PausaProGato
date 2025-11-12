import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../componentes/Footer/Footer";

export default function Login() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    // Usuário e senha "fixos" para entrar no site
    if (nome === "Nome" && senha === "Senha") {
      localStorage.setItem("logado", "true"); 
      navigate("/home"); 
    } else {
      alert("nome ou senha incorretos!");
    }
  };

  return (
    <>

      <div className="flex justify-center items-center min-h-screen bg-orange-100">
        <div className="bg-orange-50 p-8 rounded-xl shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login PausaProGato </h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="nome"
              placeholder="nome = Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="p-3 border rounded-lg"
              required
            />
            <input
              type="password"
              placeholder="SENHA = Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="p-3 border rounded-lg"
              required
            />
            <button
              type="submit"
              className="bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
            >
            <Link to="/home">
              Entrar
              </Link>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}