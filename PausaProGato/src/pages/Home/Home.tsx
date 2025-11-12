import { Link } from 'react-router-dom';

export default function Home() {
  const user = JSON.parse(localStorage.getItem("usuario") || "{}");

  const navigationCards = [
    {
      title: "Recursos",
      description: "Veja nossa página de recursos e ajuda",
      path: "/recursos",
      color: "bg-orange-200 hover:bg-orange-300 dark:bg-paw-darkCard dark:hover:bg-paw-darkCard/70"
    },
    {
      title: "Check-in de Humor",
      description: "Fale um pouco sobre seu dia",
      path: "/checkin",
      color: "bg-orange-200 hover:bg-orange-300 dark:bg-paw-darkCard dark:hover:bg-paw-darkCard/70"
    },
    {
      title: "API",
      description: "Explore nossa integração e funcionalidades",
      path: "/api",
      color: "bg-orange-200 hover:bg-orange-300 dark:bg-paw-darkCard dark:hover:bg-paw-darkCard/70"
    },
    {
      title: "Sobre",
      description: "Conheça o PausaProGato e nossa missão",
      path: "/sobre",
      color: "bg-orange-200 hover:bg-orange-300 dark:bg-paw-darkCard dark:hover:bg-paw-darkCard/70"
    }
  ];

  return (
    <section
      className="flex flex-col items-center justify-center min-h-[80vh]
                 bg-orange-100 text-orange-900 
                 dark:bg-paw-darkBg dark:text-paw-darkText 
                 transition-colors duration-500 p-8 text-center"
    >
      <h1 className="text-4xl font-bold mb-4 text-orange-600 dark:text-paw-darkAccent">
        Bem-vindo/a ao <span className="text-orange-700 dark:text-paw-darkAccent">PausaProGato</span>, {user.username || "visitante"}! 🐾
      </h1>

      {user.avatar && (
        <img
          src={`/img/${user.avatar.replace(/\s+/g, '').toLowerCase()}.png`}
          alt={user.avatar}
          className="w-40 h-40 rounded-full shadow-lg ring-4 ring-orange-400 dark:ring-paw-darkAccent p-1 mb-6"
        />
      )}

      <p className="mt-6 text-orange-700 dark:text-paw-darkText/80 max-w-lg mb-12">
        Aqui é onde você poderá explorar tudo o que o <strong>PausaProGato</strong> oferece para o seu bem-estar e tranquilidade no trabalho. 
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
        {navigationCards.map((card, index) => (
          <Link
            key={index}
            to={card.path}
            className={`${card.color} rounded-xl p-6 shadow-md border-2 border-orange-300 
                        dark:border-paw-darkAccent/30 transition-all duration-300 
                        transform hover:scale-105 hover:shadow-lg 
                        flex flex-col items-center justify-center min-h-40 no-underline`}
          >
            <h3 className="text-lg font-semibold text-orange-800 dark:text-paw-darkAccent mb-2">
              {card.title}
            </h3>
            <p className="text-sm text-orange-600 dark:text-paw-darkText/70">
              {card.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
