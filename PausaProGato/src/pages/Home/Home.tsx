import { Link } from 'react-router-dom';
import { useTheme } from '../../context/theme-provider'; 

export default function Home() {
  const user = JSON.parse(localStorage.getItem("usuario") || "{}");
  const { isDark } = useTheme(); 

  const navigationCards = [
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

        <p className={`mt-6 max-w-2xl mx-auto text-lg ${
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
      </div>
    </section>
  );
}