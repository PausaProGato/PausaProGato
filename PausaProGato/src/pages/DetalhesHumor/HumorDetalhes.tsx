import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/theme-provider";

interface Checkin {
  humor: string;
  descricao: string;
  data: string;
  timestamp: number;
}
const humorEmojis = {
  feliz: "😺",
  neutro: "😼",
  cansado: "😾", 
  triste: "😿",
  ansioso: "🙀",
  apaixonado: "😻"
};

const humorLabels = {
  feliz: "Feliz",
  neutro: "Neutro",
  cansado: "Cansado",
  triste: "Triste", 
  ansioso: "Ansioso",
  apaixonado: "Apaixonado"
};

export default function HumorDetalhes() {
  const { timestamp } = useParams<{ timestamp: string }>();
  const [checkin, setCheckin] = useState<Checkin | null>(null);
  const { isDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("usuario") || "{}");
    if (user.username && timestamp) {
      const userCheckinKey = `checkins_${user.username}`;
      const checkinsSalvos = JSON.parse(localStorage.getItem(userCheckinKey) || "[]");
      
      const checkinEncontrado = checkinsSalvos.find(
        (c: Checkin) => c.timestamp === parseInt(timestamp)
      );
      
      if (checkinEncontrado) {
        setCheckin(checkinEncontrado);
      }
    }
  }, [timestamp]);

  if (!checkin) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark 
        ? "bg-purple-900" 
        : "bg-orange-200"
      }`}>
        <div className="text-center">
          <p className={`text-xl ${
           isDark 
            ? "text-purple-50" 
            : "text-orange-800"}`}>
            Check-in não encontrado
          </p>
          <Link 
            to="/humor/historico"
            className={`mt-4 inline-block px-6 py-3 rounded-xl ${
              isDark 
              ? "bg-purple-600 text-purple-50" 
              : "bg-orange-500 text-orange-50"
            }`}
          >
            Voltar ao Histórico
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className={`min-h-screen px-6 py-12 ${
      isDark 
      ? "bg-purple-900" 
      : "bg-orange-200"
    }`}>
      
      <div className="max-w-2xl mx-auto">
        <div className={`rounded-2xl p-8 ${
          isDark 
          ? "bg-purple-950" 
          : "bg-orange-100"
        }`}>
          
          <div className="flex items-center justify-between mb-6">
            <h1 className={`text-2xl font-bold ${
              isDark 
              ? "text-purple-50" 
              : "text-orange-800"
            }`}>
              Detalhes do Check-in
            </h1>
            <button
              onClick={() => navigate(-1)}
              className={`px-4 py-2 rounded-lg ${
                isDark 
                  ? "bg-purple-800 text-purple-100 hover:bg-purple-600"
                  : "bg-orange-200 text-orange-700 hover:bg-orange-300"
              }`}
            >
              Voltar
            </button>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <span className="text-6xl mb-4 block">
                {humorEmojis[checkin.humor as keyof typeof humorEmojis] || "😼"}
              </span>
              <h2 className={`text-3xl font-bold ${
                isDark 
                ? "text-purple-50" 
                : "text-orange-800"
              }`}>
                {humorLabels[checkin.humor as keyof typeof humorLabels] || checkin.humor}
              </h2>
              <p className={`mt-2 ${
                isDark 
                ? "text-purple-300" 
                : "text-orange-600"
              }`}>
                {checkin.data}
              </p>
            </div>

            {checkin.descricao && (
              <div>
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-700"
                }`}>
                  Seu relato:
                </h3>
                <p className={`p-4 rounded-xl ${
                  isDark 
                    ? "bg-purple-900 text-purple-100 border border-purple-600"
                    : "bg-orange-50 text-orange-800 border border-orange-300"
                }`}>
                  {checkin.descricao}
                </p>
              </div>
            )}

            <div className="flex justify-center space-x-4 pt-6">
              <Link
                to="/humor/checkin"
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  isDark 
                    ? "bg-purple-800 hover:bg-purple-700 text-purple-50" 
                    : "bg-orange-500 hover:bg-orange-600 text-orange-50"
                }`}
              >
                + Novo Check-in
              </Link>
              <Link
                to="/humor/historico"
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  isDark 
                    ? "bg-purple-800 hover:bg-purple-600 text-white border border-purple-500" 
                    : "bg-orange-200 hover:bg-orange-300 text-orange-700 border border-orange-300"
                }`}
              >
                Ver Meu Histórico
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

