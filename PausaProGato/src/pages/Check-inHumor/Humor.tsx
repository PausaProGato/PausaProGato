import { useState } from "react";
import { useTheme } from "../../context/theme-provider";
type HumorOption = "feliz" | "neutro" | "cansado" | "triste" | "ansioso" | "apaixonado";

const humorEmojis: Record<HumorOption, string> = {
  feliz: "😺",
  neutro: "😼", 
  cansado: "😾",
  triste: "😿",
  ansioso: "🙀",
  apaixonado: "😻"
};

const humorLabels: Record<HumorOption, string> = {
  feliz: "Feliz",
  neutro: "Neutro",
  cansado: "Cansado",
  triste: "Triste", 
  ansioso: "Ansioso",
  apaixonado: "apaixonado"
};

const humorCores: Record<HumorOption, { claro: string; escuro: string }> = {
  feliz: { claro: "bg-green-100 border-green-400", escuro: "bg-green-900 border-green-500" },
  neutro: { claro: "bg-yellow-100 border-yellow-400", escuro: "bg-yellow-900 border-yellow-500" },
  cansado: { claro: "bg-blue-100 border-blue-400", escuro: "bg-blue-900 border-blue-500" },
  triste: { claro: "bg-purple-100 border-purple-400", escuro: "bg-purple-900 border-purple-500" },
  ansioso: { claro: "bg-red-100 border-red-400", escuro: "bg-red-900 border-red-500" },
  apaixonado: {claro: "bg-pink-100 border-pink-300", escuro: "bg-pink-500 border-pink-300" }
};

export default function HumorCheckin() {
  const [humorSelecionado, setHumorSelecionado] = useState<HumorOption | "">("");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const { isDark } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!humorSelecionado) {
      setMensagem("Por favor, selecione como você está se sentindo");
      return;
    }

    const novoCheckin = {
      humor: humorSelecionado,
      descricao,
      data: new Date().toLocaleString('pt-BR'),
      timestamp: new Date().getTime()
    };

    const checkinsSalvos = JSON.parse(localStorage.getItem("checkins") || "[]");
    const novosCheckins = [novoCheckin, ...checkinsSalvos].slice(0, 50); // Mantém apenas os 50 mais recentes

    localStorage.setItem("checkins", JSON.stringify(novosCheckins));

    setMensagem(`Check-in ${humorLabels[humorSelecionado]} registrado com sucesso! 🐾`);
    setDescricao("");
    setHumorSelecionado("");
    
    // Limpa a mensagem após 5 segundos
    setTimeout(() => setMensagem(""), 5000);
  };

  const getHumorColor = (humor: HumorOption) => {
    return isDark ? humorCores[humor].escuro : humorCores[humor].claro;
  };

  return (
    <section className={`min-h-screen flex flex-col items-center justify-center px-6 py-12 transition-colors duration-300 ${
      isDark 
        ? "bg-purple-900" 
        : "bg-orange-200"
    }`}>
      
      <div className={`shadow-xl rounded-2xl p-8 w-full max-w-md transition-colors duration-300 ${
        isDark 
          ? "bg-purple-800  border border-purple-600" 
          : "bg-orange-50  border border-orange-200"
      }`}>
        
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${
            isDark ? "text-white" : "text-orange-800"
          }`}>
            Check-in do Humor
          </h1>
          <p className={`text-lg ${
            isDark ? "text-purple-200" : "text-orange-600"
          }`}>
            Como você está se sentindo hoje?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className={`block text-sm font-medium mb-4 text-center ${
              isDark ? "text-purple-200" : "text-orange-700"
            }`}>
              Selecione seu humor:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(humorEmojis).map(([key, emoji]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setHumorSelecionado(key as HumorOption)}
                  className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 border-2 ${
                    humorSelecionado === key 
                      ? `${getHumorColor(key as HumorOption)} scale-105 shadow-lg transform -translate-y-1` 
                      : isDark 
                        ? "bg-purple-700 border-purple-500 hover:bg-purple-600 hover:scale-105" 
                        : "bg-orange-100 border-orange-300 hover:bg-orange-200 hover:scale-105"
                  }`}
                >
                  <span className="text-3xl mb-1">{emoji}</span>
                  <span className={`text-xs font-medium ${
                    isDark ? "text-purple-100" : "text-orange-700"
                  }`}>
                    {humorLabels[key as HumorOption]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="descricao" className={`block text-sm font-medium mb-2 ${
              isDark ? "text-purple-200" : "text-orange-700"
            }`}>
              Quer compartilhar mais sobre seu dia?
              <span className="text-xs ml-1 opacity-70">(opcional)</span>
            </label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Conte-nos sobre seu dia, o que está sentindo, ou algo que te fez sorrir..."
              className={`w-full rounded-xl p-4 focus:ring-2 outline-none transition-colors duration-300 resize-none ${
                isDark
                  ? "bg-purple-900 border border-purple-600 text-white placeholder-purple-400 focus:ring-purple-500 focus:border-purple-500"
                  : "bg-orange-50 border border-orange-300 text-orange-900 placeholder-orange-500 focus:ring-orange-500 focus:border-orange-500"
              }`}
              rows={4}
              maxLength={500}
            />
            <div className={`text-right text-xs mt-1 ${
              isDark ? "text-purple-300" : "text-orange-600"
            }`}>
              {descricao.length}/500 caracteres
            </div>
          </div>

          <button
            type="submit"
            disabled={!humorSelecionado}
            className={`w-full font-bold py-4 rounded-xl transition-all duration-300 shadow-lg ${
              !humorSelecionado
                ? isDark
                  ? "bg-purple-400 text-purple-200 cursor-not-allowed opacity-50"
                  : "bg-orange-300 text-orange-100 cursor-not-allowed opacity-50"
                : isDark
                  ? "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-purple-500/25 transform hover:scale-105"
                  : "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-orange-500/25 transform hover:scale-105"
            }`}
          >
            Registrar
          </button>
        </form>

        {mensagem && (
          <div className={`mt-6 p-4 rounded-xl text-center transition-all duration-300 ${
            mensagem.includes("sucesso") 
              ? isDark 
                ? "bg-green-900 text-green-100 border border-green-700" 
                : "bg-green-100 text-green-800 border border-green-300"
              : isDark
                ? "bg-yellow-900 text-yellow-100 border border-yellow-700"
                : "bg-yellow-100 text-yellow-800 border border-yellow-300"
          }`}>
            <p className="font-medium">{mensagem}</p>
          </div>
        )}
      </div>
    </section>
  );
}