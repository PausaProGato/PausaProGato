import { Link, useNavigate } from 'react-router-dom'; // <-- 1. Importar useNavigate
import { useTheme } from '../../context/theme-provider';
import { useState, useEffect } from 'react';

// --- Tipos e Constantes ---
type HumorOption = "feliz" | "neutro" | "cansado" | "triste" | "ansioso" | "apaixonado";

interface CheckinEntry {
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

const humorCores: Record<HumorOption, { claro: string; escuro: string }> = {
  feliz: { claro: "bg-green-100 border-green-400 text-green-900", escuro: "bg-green-900 border-green-700 text-green-100" },
  neutro: { claro: "bg-yellow-100 border-yellow-400 text-yellow-900", escuro: "bg-yellow-900 border-yellow-700 text-yellow-100" },
  cansado: { claro: "bg-blue-100 border-blue-400 text-blue-900", escuro: "bg-blue-900 border-blue-700 text-blue-100" },
  triste: { claro: "bg-purple-100 border-purple-400 text-purple-900", escuro: "bg-purple-800 border-purple-600 text-purple-100" },
  ansioso: { claro: "bg-red-100 border-red-400 text-red-900", escuro: "bg-red-900 border-red-700 text-red-100" },
  apaixonado: { claro: "bg-pink-100 border-pink-300 text-pink-900", escuro: "bg-pink-900 border-pink-700 text-pink-100" }
};
// --- Fim dos Tipos ---


export default function Home() {
  const user = JSON.parse(sessionStorage.getItem("usuario") || "{}");
  const { isDark } = useTheme();
  const [checkins, setCheckins] = useState<CheckinEntry[]>([]);
  const navigate = useNavigate(); // <-- 2. Iniciar o hook

  useEffect(() => {
    if (user.username) {
      const userCheckinKey = `checkins_${user.username}`;
      const checkinsSalvos = JSON.parse(localStorage.getItem(userCheckinKey) || "[]");
      setCheckins(checkinsSalvos);
    } else {
      setCheckins([]);
    }
  }, [user.username]);

  // --- 3. Função de Logout ---
  const handleLogout = () => {
    // 1. Remove o usuário da sessão
    sessionStorage.removeItem("usuario");

    // 2. Redireciona para a página de login (raiz do site)
    navigate("/");
  };
  // -------------------------

  const getHumorStyle = (humor: HumorOption) => {
    const styles = humorCores[humor];
    return isDark ? styles.escuro : styles.claro;
  };

  const navigationCards = [
    // ... (Seus cards de navegação)
    {
      title: "Recursos",
      description: "Veja nossa página de recursos e ajuda",
      path: "/recursos",
    },
    {
      title: "Check-in de Humor",
      description: "Fale um pouco sobre seu dia",
      path: "/checkin",
    },
    {
      title: "API",
      description: "Explore nossa integração e funcionalidades",
      path: "/api",
    },
    {
      title: "Sobre",
      description: "Conheça o PausaProGato e nossa missão",
      path: "/sobre",
    }
  ];

  return (
    <section
      className={`flex flex-col items-center justify-center min-h-[80vh] p-8 text-center transition-colors duration-300 ${
        isDark
          ? "bg-purple-900 text-white"
          : "bg-linear-to-br from-orange-100 to-orange-200 text-orange-900"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
          isDark
            ? "text-purple-50"
            : "text-orange-800"
        }`}>
          Bem-vindo/a ao <span className={isDark ? "text-gray-950" : "text-orange-600"}>
            PausaProGato
          </span>, {user.username || "visitante"}! 🐾
        </h1>

        {user.avatar && (
          <div className="flex justify-center mb-6">
            <img
              src={`/img/${user.avatar.replace(/\s+/g, '').toLowerCase()}.png`}
              alt={user.avatar}
              className={`w-32 h-32 rounded-full shadow-lg p-1 transition-all duration-300 ${
                isDark
                  ? "ring-4 ring-purple-600 hover:ring-purple-400"
                  : "ring-4 ring-orange-600 hover:ring-orange-400"
              }`}
            />
          </div>
        )}

        {/* --- 4. BOTÃO DE SAIR ADICIONADO AQUI --- */}
        {/* Ele só aparece se o usuário estiver logado (tiver um user.username) */}
        {user.username && (
          <button
            onClick={handleLogout}
            className={`mt-4 font-medium py-2 px-5 rounded-lg transition-all shadow-lg ${
              isDark
                ? "bg-red-700 text-white hover:bg-red-800 hover:shadow-red-500/20"
                : "bg-red-500 text-white hover:bg-red-600 hover:shadow-red-500/20"
            }`}
          >
            Sair da Conta
          </button>
        )}
        {/* --- FIM DO BOTÃO --- */}

        <p className={`mt-8 max-w-2xl mx-auto text-lg ${ // Aumentei a margem top para mt-8
          isDark
            ? "text-purple-200"
            : "text-orange-700"
        }`}>
          Aqui é onde você poderá explorar tudo o que o <strong>PausaProGato</strong> oferece para o seu bem-estar e tranquilidade no trabalho.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl mt-12">
          {navigationCards.map((card, index) => (
            <Link
              key={index}
              to={card.path}
              className={`rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 
                          transform hover:scale-105 hover:shadow-xl 
                          flex flex-col items-center justify-center min-h-40 no-underline
                          ${isDark
                ? "bg-purple-800 border-purple-600 hover:bg-purple-700 hover:border-purple-500"
                : "bg-linear-to-br from-orange-50 to-orange-100 border-orange-300 hover:from-orange-100 hover:to-orange-200 hover:border-orange-400"
              }`}
            >
              <h3 className={`text-xl font-semibold mb-2 ${
                isDark ? "text-white" : "text-orange-800"
              }`}>
                {card.title}
              </h3>
              
              <p className={`text-sm ${
                isDark ? "text-purple-200" : "text-orange-600"
              }`}>
                {card.description}
              </p>
            </Link>
          ))}
        </div>
        
        {/* --- Seção de Histórico --- */}
        <div className="w-full max-w-5xl mt-16 text-left">
          <h2 className={`text-3xl font-bold mb-6 text-center ${
            isDark ? "text-purple-50" : "text-orange-800"
          }`}>
            Seu Histórico de Humor
          </h2>

          {checkins.length === 0 ? (
            <div className={`p-6 rounded-2xl text-center ${
              isDark ? "bg-purple-800 border border-purple-600" : "bg-orange-50 border border-orange-200"
            }`}>
              <p className={isDark ? "text-purple-200" : "text-orange-600"}>
                {user.username
                  ? "Você ainda não registrou nenhum humor."
                  : "Faça login para ver seu histórico de humor."}
              </p>
              {user.username && (
                <Link
                  to="/checkin"
                  className={`inline-block mt-4 font-bold py-2 px-4 rounded-lg transition-all ${
                    isDark ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  Fazer meu primeiro check-in
                </Link>
              )}
            </div>
          ) : (
            // Grid com os check-ins recentes
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {checkins.slice(0, 6).map((checkin) => {
                const [data, horaCompleta] = checkin.data.split(' ');
                const horaCurta = horaCompleta ? horaCompleta.substring(0, 5) : ''; 

                return (
                  <div
                    key={checkin.timestamp}
                    className={`rounded-xl p-4 shadow-lg border-2 transition-all duration-300 ${getHumorStyle(checkin.humor)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{humorEmojis[checkin.humor]}</span>
                      
                      <span className="font-semibold text-xs opacity-90">
                        {data} - {horaCurta}
                      </span>

                    </div>
                    <p className={`text-sm ${
                      isDark ? 'text-purple-100' : 'text-gray-800'
                    }`}>
                      {checkin.descricao || "Nenhuma descrição."}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}