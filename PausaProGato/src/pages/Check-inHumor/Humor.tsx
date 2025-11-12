import { useState } from "react";

type HumorOption = "feliz" | "neutro" | "cansado" | "triste" | "ansioso";

const humorEmojis: Record<HumorOption, string> = {
  feliz: "😺",
  neutro: "😼",
  cansado: "😾",
  triste: "😿",
  ansioso: "🙀",
};

export default function HumorCheckin() {
  const [humorSelecionado, setHumorSelecionado] = useState<HumorOption | "">("");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!humorSelecionado) {
      setMensagem("Por favor, selecione como você está se sentindo");
      return;
    }

    const novoCheckin = {
      humor: humorSelecionado,
      descricao,
      data: new Date().toLocaleString(),
    };

    const checkinsSalvos = JSON.parse(localStorage.getItem("checkins") || "[]");

    localStorage.setItem("checkins", JSON.stringify([...checkinsSalvos, novoCheckin]));

    setMensagem("Seu check-in foi registrado com sucesso! 🐾");
    setDescricao("");
    setHumorSelecionado("");
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-orange-100 px-6 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">
          Check-in de Humor 
        </h1>
        <p className="text-orange-600 mb-6">
          Como você está se sentindo hoje?
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-4 flex-wrap">
            {Object.entries(humorEmojis).map(([key, emoji]) => (
              <button
                key={key}
                type="button"
                onClick={() => setHumorSelecionado(key as HumorOption)}
                className={`text-4xl transition-transform hover:scale-125 ${
                  humorSelecionado === key ? "scale-125 bg-orange-200 rounded-full p-2" : ""
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>

          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Quer contar um pouco sobre seu dia?"
            className="w-full border border-orange-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 outline-none"
            rows={4}
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-all duration-300"
          >
            Registrar Humor
          </button>
        </form>

        {mensagem && (
          <p className="mt-6 text-orange-700 font-medium bg-orange-100 py-2 px-4 rounded-lg">
            {mensagem}
          </p>
        )}
      </div>
    </section>
  );
}
