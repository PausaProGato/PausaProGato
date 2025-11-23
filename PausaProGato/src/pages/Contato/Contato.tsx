import { useState } from "react";
import { useTheme } from "../../context/theme-provider";

export default function Contato() {
  const { isDark } = useTheme(); 
  
  const [form, setForm] = useState({
    nomeCompleto: "",
    numTel: "",
    email: "",
    mensagem: ""
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "mensagem" && value.length > 1000) {
      return;
    }
    
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.mensagem.trim().length < 15) {
      alert("Por favor, escreva uma mensagem com pelo menos 15 caracteres.");
      return;
    }
    
    setSuccess(true);
    setForm({ nomeCompleto: "", numTel: "", email: "", mensagem: "" });
  };

  const closeModal = () => {
    setSuccess(false);
  };

  return (
    <main id="contato" className={`flex-1 flex items-center justify-center py-8 px-4 transition-colors duration-300 ${
      isDark 
        ? "bg-purple-900" 
        : "bg-orange-200"
    }`}>
      
      <div className={`shadow-lg rounded-2xl p-6 w-full max-w-lg duration-300 ${
        isDark 
          ? "bg-purple-950 border border-purple-700" 
          : "bg-orange-50 border-orange-200"
      }`}>
        
        <h2 className={`text-2xl font-bold text-center mb-6 ${
          isDark 
          ? "text-white" 
          : "text-orange-800"
        }`}>
          Entre em contato conosco
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="nomeCompleto" className={`block font-medium ${
              isDark 
              ? "text-purple-200" 
              : "text-orange-700"
            }`}>
              Nome Completo:
            </label>
            <input
              type="text"
              name="nomeCompleto"
              id="nomeCompleto"
              value={form.nomeCompleto}
              onChange={handleChange}
              required
              className={`mt-1 w-full rounded-lg px-4 py-3 shadow-sm focus:ring-2 outline-none transition-colors duration-300 ${
                isDark
                  ? "bg-purple-900 border border-purple-600 text-white placeholder-purple-400 focus:ring-purple-500 focus:border-purple-500"
                  : "bg-orange-50 border border-orange-300 text-orange-900 placeholder-orange-500 focus:ring-orange-500 focus:border-orange-500"
              }`}
              placeholder="Seu nome completo"
            />
          </div>

          <div>
            <label htmlFor="numTel" className={`block font-medium ${
              isDark 
              ? "text-purple-200" 
              : "text-orange-700"
            }`}>
              Número (Telefone):
            </label>
            <input
              type="tel"
              name="numTel"
              id="numTel"
              value={form.numTel}
              onChange={handleChange}
              required
              className={`mt-1 w-full rounded-lg px-4 py-3 shadow-sm focus:ring-2 outline-none transition-colors duration-300 ${
                isDark
                  ? "bg-purple-900 border border-purple-600 text-white placeholder-purple-400 focus:ring-purple-500 focus:border-purple-500"
                  : "bg-orange-50 border border-orange-300 text-orange-900 placeholder-orange-500 focus:ring-orange-500 focus:border-orange-500"
              }`}
              placeholder="(11) 99999-9999"
            />
          </div>

          <div>
            <label htmlFor="email" className={`block font-medium ${
              isDark 
              ? "text-purple-200" 
              : "text-orange-700"
            }`}>
              E-mail:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className={`mt-1 w-full rounded-lg px-4 py-3 shadow-sm focus:ring-2 outline-none transition-colors duration-300 ${
                isDark
                  ? "bg-purple-900 border border-purple-600 text-white placeholder-purple-400 focus:ring-purple-500 focus:border-purple-500"
                  : "bg-orange-50 border border-orange-300 text-orange-900 placeholder-orange-500 focus:ring-orange-500 focus:border-orange-500"
              }`}
              placeholder="seu.email@exemplo.com"
            />
          </div>

          <div>
            <label htmlFor="mensagem" className={`block font-medium ${
              isDark 
              ? "text-purple-200" 
              : "text-orange-700"
            }`}>
              Motivo do seu contato:
            </label>
            <textarea
              name="mensagem"
              id="mensagem"
              value={form.mensagem}
              onChange={handleChange}
              required
              rows={5}
              minLength={10}
              maxLength={1000}
              className={`mt-1 w-full rounded-lg px-4 py-3 shadow-sm focus:ring-2 outline-none resize-none transition-colors duration-300 ${
                isDark
                  ? "bg-purple-900 border border-purple-600 text-white placeholder-purple-400 focus:ring-purple-500 focus:border-purple-500"
                  : "bg-orange-50 border border-orange-300 text-orange-900 placeholder-orange-500 focus:ring-orange-500 focus:border-orange-500"
              }`}
              placeholder="Conte-nos como podemos ajudar você..."
            />
            <div className={`text-right text-sm mt-1 transition-colors duration-300 ${
              form.mensagem.length > 950 
                ? 'text-red-500' 
                : isDark 
                  ? 'text-purple-300' 
                  : 'text-orange-600'
            }`}>
              {form.mensagem.length}/1000 caracteres
              {form.mensagem.length < 10 && form.mensagem.length > 0 && (
                <span className="text-red-500 ml-2">(mínimo 10 caracteres)</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={form.mensagem.length < 10}
            className={`flex justify-center w-3/4 mx-auto font-bold py-3 rounded-lg transition-all duration-300 shadow-md mt-6 ${
              form.mensagem.length < 10 
                ? isDark
                  ? 'bg-purple-400 text-purple-200 cursor-not-allowed opacity-50'
                  : 'bg-orange-300 text-orange-100 cursor-not-allowed opacity-50'
                : isDark
                  ? 'bg-linear-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700 hover:shadow-purple-500/25 transform hover:scale-105'
                  : 'bg-linear-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/25 transform hover:scale-105'
            }`}
          >
             Enviar Mensagem
          </button>
        </form>

        {success && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className={`rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fadeIn transition-colors duration-300 ${
              isDark 
                ? "bg-violet-800 border border-purple-600" 
                : "bg-orange-50  border border-orange-200"
            }`}>
              
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isDark 
                ? "bg-purple-600" 
                : "bg-orange-500"
              }`}>
                <span className="text-2xl text-white">✓</span>
              </div>
              
              <h2 className={`text-2xl font-bold mb-2 ${
                isDark 
                ? "text-green-300" 
                : "text-green-600"
              }`}>
                Mensagem Enviada!
              </h2>
              
              <p className={`mb-2 ${
                isDark 
                ? "text-purple-200" 
                : "text-orange-700"
              }`}>
                Obrigada pelo seu contato, <strong>{form.nomeCompleto}</strong>!
              </p>
              
              <p className={`text-sm mb-6 ${
                isDark 
                ? "text-purple-300" 
                : "text-orange-600"
              }`}>
                Retornaremos em breve através do telefone ou e-mail informado.
              </p>

              <button
                onClick={closeModal}
                className={`w-full font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? "bg-violet-800 text-white hover:bg-violet-700"
                    : "bg-orange-600 text-white hover:bg-orange-700"
                }`}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}