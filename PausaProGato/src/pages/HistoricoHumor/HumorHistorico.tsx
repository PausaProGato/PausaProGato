import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/theme-provider";

type HumorOption = "feliz" | "neutro" | "cansado" | "triste" | "ansioso" | "apaixonado";

interface Checkin {
  humor: HumorOption;
  descricao: string;
  data: string;
  timestamp: number;
}

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
  apaixonado: "Apaixonado"
};

export default function HumorHistorico() {
  const { periodo = "semana" } = useParams<{ periodo?: string }>();
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const { isDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    carregarCheckins();
  }, [periodo]);

  const carregarCheckins = () => {
    const user = JSON.parse(sessionStorage.getItem("usuario") || "{}");
    if (user.username) {
      const userCheckinKey = `checkins_${user.username}`;
      const checkinsSalvos = JSON.parse(localStorage.getItem(userCheckinKey) || "[]");
      
      const checkinsFiltrados = filtrarPorPeriodo(checkinsSalvos, periodo);
      setCheckins(checkinsFiltrados);
    }
  };

  const filtrarPorPeriodo = (checkins: Checkin[], periodo: string): Checkin[] => {
    const agora = new Date().getTime();
    const umDia = 24 * 60 * 60 * 1000;
    
    switch (periodo) {
      case "hoje":
        return checkins.filter(checkin => (agora - checkin.timestamp) < umDia);
      case "semana":
        return checkins.filter(checkin => (agora - checkin.timestamp) < 7 * umDia);
      case "mes":
        return checkins.filter(checkin => (agora - checkin.timestamp) < 30 * umDia);
      case "todos":
      default:
        return checkins;
    }
  };

  const removerCheckin = (timestamp: number) => {
    if (window.confirm("Tem certeza que deseja excluir este check-in?")) {
      const user = JSON.parse(sessionStorage.getItem("usuario") || "{}");
      if (user.username) {
        const userCheckinKey = `checkins_${user.username}`;
        const checkinsSalvos = JSON.parse(localStorage.getItem(userCheckinKey) || "[]");
        const novosCheckins = checkinsSalvos.filter((checkin: Checkin) => checkin.timestamp !== timestamp);
        
        localStorage.setItem(userCheckinKey, JSON.stringify(novosCheckins));
        carregarCheckins(); 
      }
    }
  };

  const limparTodosCheckins = () => {
    if (window.confirm("Tem certeza que deseja excluir TODOS os check-ins?")) {
      const user = JSON.parse(sessionStorage.getItem("usuario") || "{}");
      if (user.username) {
        const userCheckinKey = `checkins_${user.username}`;
        localStorage.removeItem(userCheckinKey);
        setCheckins([]);
      }
    }
  };

  const editarCheckin = (timestamp: number) => {
    navigate(`/humor/checkin/${timestamp}`);
  };

  const verDetalhes = (timestamp: number) => {
    navigate(`/humor/detalhes/${timestamp}`);
  };

  const estatisticas = calcularEstatisticas(checkins);

  return (
    <section className={`min-h-screen px-6 py-8 transition-colors duration-300 ${
      isDark 
      ? "bg-purple-900" 
      : "bg-orange-200"
    }`}>
      
      <div className="max-w-4xl mx-auto">
        <div className={`mb-8 rounded-2xl p-6 ${
          isDark 
          ? "bg-purple-950" 
          : "bg-orange-100"
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${
                isDark 
                ? "text-purple-50" 
                : "text-orange-800"
              }`}>
                Seu Histórico de Humor
              </h1>
              <p className={
                isDark 
                ? "text-purple-300" 
                : "text-orange-600"
                }>
                {checkins.length} check-in(s) neste período
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/humor/checkin")}
                className={`font-bold py-2 px-4 rounded-lg transition shadow-md ${
                  isDark 
                    ? "bg-purple-800 text-purple-50 hover:bg-purple-900" 
                    : "bg-orange-500 text-orange-50 hover:bg-orange-600"
                }`}
              >
                + Novo Check-in
              </button>
              {checkins.length > 0 && (
                <button
                  onClick={limparTodosCheckins}
                  className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition shadow-md"
                >
                  x Limpar Todos
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            {["todos", "hoje", "semana", "mes"].map((p) => (
              <Link
                key={p}
                to={`/humor/historico/${p}`}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  periodo === p
                    ? isDark 
                      ? "bg-purple-800 text-purple-50 shadow-lg"
                      : "bg-orange-500 text-orange-50 shadow-lg"
                    : isDark
                      ? "bg-purple-900 text-purple-200 hover:bg-purple-800"
                      : "bg-orange-200 text-orange-700 hover:bg-orange-300"
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Link>
            ))}
          </div>
        </div>

        {estatisticas.total > 0 && (
          <div className={`mb-8 p-6 rounded-2xl ${
            isDark 
            ? "bg-purple-950" 
            : "bg-orange-100"
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${
              isDark 
              ? "text-purple-50" 
              : "text-orange-800"
            }`}>
              Estatísticas do Período
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  isDark 
                  ? "text-purple-300" 
                  : "text-orange-600"
                }`}>
                  {estatisticas.total}
                </div>
                <div className={`text-sm ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-700"
                }`}>
                  Check-ins
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  isDark 
                  ? "text-green-300" 
                  : "text-green-600"
                }`}>
                  {humorEmojis[estatisticas.maisFrequente]}
                </div>
                <div className={`text-sm ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-700"
                }`}>
                  Mais frequente
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  isDark 
                  ? "text-blue-300" 
                  : "text-blue-600"
                }`}>
                  {estatisticas.mediaPorDia}
                </div>
                <div className={`text-sm ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-700"
                }`}>
                  Média/dia
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  isDark 
                  ? "text-yellow-300" 
                  : "text-yellow-600"
                }`}>
                  {estatisticas.ultimoHumor ? humorEmojis[estatisticas.ultimoHumor] : "-"}
                </div>
                <div className={`text-sm ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-700"
                }`}>
                  Último
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {checkins.length === 0 ? (
            <div className={`text-center py-12 rounded-2xl ${
              isDark 
              ? "bg-purple-950 text-purple-100" 
              : "bg-orange-100 text-orange-700"
            }`}>
              <p className="text-lg mb-4">Nenhum check-in encontrado para este período</p>
              <Link 
                to="/humor/checkin"
                className={`inline-block px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  isDark 
                    ? "bg-purple-800 hover:bg-purple-900 text-white" 
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                }`}
              >
                Fazer Primeiro Check-in
              </Link>
            </div>
          ) : (
            checkins.map((checkin, index) => (
              <div 
                key={index}
                className={`p-6 rounded-2xl transition-all duration-300 ${
                  isDark 
                  ? "bg-purple-950 hover:bg-purple-800" 
                  : "bg-orange-100 hover:bg-orange-50"
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-3xl">{humorEmojis[checkin.humor]}</span>
                      <div>
                        <h3 className={`font-bold text-lg ${
                          isDark 
                          ? "text-purple-50" 
                          : "text-orange-800"
                        }`}>
                          {humorLabels[checkin.humor]}
                        </h3>
                        <p className={`text-sm ${
                          isDark 
                          ? "text-purple-300" 
                          : "text-orange-600"
                        }`}>
                          {checkin.data}
                        </p>
                      </div>
                    </div>
                    
                    {checkin.descricao && (
                      <p className={`mt-2 ${
                        isDark 
                        ? "text-purple-100" 
                        : "text-orange-700"
                      }`}>
                        {checkin.descricao}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => verDetalhes(checkin.timestamp)}
                      className={`px-3 py-2 rounded-lg font-medium transition ${
                        isDark 
                        ? "bg-purple-700 text-purple-200 hover:bg-purple-600" 
                        : "bg-orange-200 text-orange-700 hover:bg-orange-300"
                      }`}
                      title="Ver detalhes"
                    >
                      Ver detalhes
                    </button>                  
                    <button
                      onClick={() => editarCheckin(checkin.timestamp)}
                      className={`px-3 py-2 rounded-lg font-medium transition ${
                        isDark 
                        ? "bg-purple-600 text-purple-100 hover:bg-purple-500" 
                        : "bg-orange-300 text-orange-800 hover:bg-orange-400"
                      }`}
                      title="Editar check-in"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => removerCheckin(checkin.timestamp)}
                      className="bg-red-100 text-red-700 px-3 py-2 rounded-lg font-medium hover:bg-red-200 transition"
                      title="Excluir check-in"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/home" 
            className={`font-medium ${
              isDark 
                ? "text-purple-200 hover:text-purple-100" 
                : "text-orange-700 hover:text-orange-800"
            }`}
          >
            ← Voltar para Home
          </Link>
        </div>
      </div>
    </section>
  );
}

function calcularEstatisticas(checkins: Checkin[]) {
  if (checkins.length === 0) {
    return { total: 0, maisFrequente: "neutro" as HumorOption, mediaPorDia: 0, ultimoHumor: null };
  }

  const frequencia: Record<HumorOption, number> = {
    feliz: 0, neutro: 0, cansado: 0, triste: 0, ansioso: 0, apaixonado: 0
  };

  checkins.forEach(checkin => {
    frequencia[checkin.humor]++;
  });

  const maisFrequente = Object.entries(frequencia).reduce((a, b) => 
    a[1] > b[1] ? a : b
  )[0] as HumorOption;

  const dias = Math.max(1, Math.ceil(
    (new Date().getTime() - Math.min(...checkins.map(c => c.timestamp))) / (24 * 60 * 60 * 1000)
  ));

  return {
    total: checkins.length,
    maisFrequente,
    mediaPorDia: (checkins.length / dias).toFixed(1),
    ultimoHumor: checkins[0]?.humor || null
  };
}