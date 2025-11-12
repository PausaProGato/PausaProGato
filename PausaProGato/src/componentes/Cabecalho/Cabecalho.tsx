import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext"; 
import { BotaoTema } from "../BotaoTema/BotaoTema";

interface NavLink {
  to: string;
  label: string;
}

const Cabecalho: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme(); 

  const links: NavLink[] = [
    { to: "/home", label: "Home" },
    { to: "/faq", label: "FAQ" },
    { to: "/sobre", label: "Sobre" },
    { to: "/contato", label: "Contato" },
    { to: "/checkin", label: "Check-in de humor" },
    { to: "/api", label: "API" },
    { to: "/recursos", label: "Recursos/Ajuda" },
  ];

  const handleLogoClick = () => {
    navigate("/home");
    setMenuOpen(false);
  };

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <header
      className={`shadow-md transition-colors duration-300 ${
        theme === "dark" ? "bg-paw-darkBg text-paw-darkText" : "bg-orange-400 text-orange-700"
      }`}
    >
      <div className="w-full mx-auto flex justify-between items-center p-3">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo PausaProGato"
            className="h- cursor-pointer"
            onClick={handleLogoClick}
          />
        </div>

        {/* Menu para telas maiores */}
        <nav className="hidden lg:flex gap-6 p-4 font-bold text-lg">
          {links.map((link: NavLink) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-xl px-4 py-2 transition-colors ${
                isActiveLink(link.to)
                  ? "bg-orange-500 text-white dark:bg-paw-accent dark:text-white"
                  : "hover:bg-white hover:text-orange-500 dark:hover:bg-paw-darkCard dark:hover:text-paw-darkText"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <BotaoTema />
        </div>

        {/* Botão hambúrguer */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-between h-6 w-7"
            aria-label="Menu mobile"
          >
            <span
              className={`block h-1 w-full bg-current transform transition duration-300 ${
                menuOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`block h-1 w-full bg-current transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block h-1 w-full bg-current transform transition duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav
          className={`lg:hidden w-full flex flex-col items-center gap-4 py-6 font-bold text-[1.3rem] ${
            theme === "dark" ? "bg-paw-darkCard text-paw-darkText" : "bg-orange-100 text-orange-700"
          }`}
        >
          {links.map((link: NavLink) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`rounded-xl px-4 py-2 transition-colors w-48 text-center ${
                isActiveLink(link.to)
                  ? "bg-orange-600 text-white dark:bg-paw-accent"
                  : "hover:bg-white hover:text-orange-600 dark:hover:bg-paw-darkBg"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <BotaoTema />
        </nav>
      )}
    </header>
  );
};

export default Cabecalho;
