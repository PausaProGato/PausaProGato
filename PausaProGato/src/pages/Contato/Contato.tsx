import { useState } from "react";

export default function Contato() {
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
    
    if (form.mensagem.trim().length < 10) {
      alert("Por favor, escreva uma mensagem com pelo menos 10 caracteres.");
      return;
    }
    
    setSuccess(true);
    setForm({ nomeCompleto: "", numTel: "", email: "", mensagem: "" });
  };

  const closeModal = () => {
    setSuccess(false);
  };

  return (
    <main id="contato" className="flex-1 flex items-center justify-center bg-gray-200 rounded-2xl py-8 px-4">
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-[1.5rem] font-bold text-center mb-6 text-[#092d5c]">
          Entre em contato conosco
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nomeCompleto" className="block font-medium text-gray-700">
              Nome Completo:
            </label>
            <input
              type="text"
              name="nomeCompleto"
              id="nomeCompleto"
              value={form.nomeCompleto}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label htmlFor="numTel" className="block font-medium text-gray-700">
              Número (Telefone):
            </label>
            <input
              type="tel"
              name="numTel"
              id="numTel"
              value={form.numTel}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              E-mail:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label htmlFor="mensagem" className="block font-medium text-gray-700">
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
              maxLength={500}
              className="mt-1 w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            />
            <div className={`text-right text-sm mt-1 ${
              form.mensagem.length > 950 ? 'text-red-500' : 'text-gray-500'
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
            className={`flex justify-center w-3/4 mx-auto bg-[#092d5c] text-white font-bold py-3 rounded-lg transition duration-200 shadow-md mt-6 ${
              form.mensagem.length < 10 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-800'
            }`}
          >
            Enviar Mensagem
          </button>
        </form>

        {success && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center animate-fadeIn">
              
              <h2 className="text-2xl font-bold text-green-700 mb-2">
                Mensagem Enviada!
              </h2>
              
              <p className="text-gray-600 mb-2">
                Obrigada pelo seu contato, <strong>{form.nomeCompleto}</strong>!
              </p>
              
              <p className="text-gray-500 text-sm mb-6">
                Retornaremos em breve através do telefone ou e-mail informado.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-[#092d5c] text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 transition duration-200"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}