import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context/theme-provider"; 
import BotaoTema from "../BotaoTema/BotaoTema";

interface NavLink {
  to: string;
  label: string;
}

const Cabecalho: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();

  const links: NavLink[] = [
    { to: "/home", label: "Home" },
    { to: "/humor/checkin", label: "Check-in de humor" },
    { to: "/recursos", label: "Ajuda" },
    { to: "/faq", label: "FAQ" },
    { to: "/registro", label: "Registro Diário" },
    { to: "/sobre", label: "Sobre" },
    { to: "/contato", label: "Contato"},
    { to: "/integrantes", label: "Integrantes" },
  ];

  const handleLogoClick = () => {
    navigate("/home");
    setMenuOpen(false);
  };

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <header
      className={
        isDark 
          ? "bg-purple-950 text-purple-100 shadow-lg" 
          : "bg-orange-400 text-orange-900 shadow-md"
      }
    >
      <div className="w-full mx-auto flex justify-between items-center p-3">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo PausaProGato"
            className="h-10 cursor-pointer"
            onClick={handleLogoClick}
          />
        </div>

        {/* Menu para telas maiores */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex gap-2 p-4 font-bold text-lg">
            {links.map((link: NavLink) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-xl px-4 py-2 transition-colors ${
                  isActiveLink(link.to)
                    ? isDark
                      ? "bg-violet-800 text-purple-100" 
                      : "bg-orange-500 text-orange-50"
                    : isDark
                    ? "hover:bg-violet-900 hover:text-purple-200"
                    : "hover:bg-orange-100 hover:text-orange-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <BotaoTema />
          </div>
        </div>

        <div className="lg:hidden flex items-center gap-4">
          <div className="hidden sm:block">
            <BotaoTema />
          </div>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-between h-6 w-7"
            aria-label="Menu mobile"
          >
            <span
              className={`block h-1 w-full ${
                isDark ? "bg-purple-300" : "bg-orange-950"
              } transform transition duration-300 ${
                menuOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`block h-1 w-full ${
                isDark ? "bg-purple-300" : "bg-orange-950"
              } transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block h-1 w-full ${
                isDark ? "bg-purple-300" : "bg-orange-950"
              } transform transition duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div
          className={`lg:hidden w-full ${
            isDark 
              ? "bg-violet-900 text-purple-100" 
              : "bg-orange-200 text-orange-800"
          }`}
        >
          <nav className="flex flex-col items-center gap-4 py-6 font-bold text-[1.3rem]">
            {links.map((link: NavLink) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`rounded-xl px-4 py-2 transition-colors w-48 text-center ${
                  isActiveLink(link.to)
                    ? isDark
                      ? "bg-violet-800 text-purple-50"
                      : "bg-orange-600 text-orange-50"
                    : isDark
                    ? "hover:bg-purple-100 hover:text-violet-900"
                    : "hover:bg-orange-100 hover:text-orange-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="pb-6 flex justify-center sm:hidden">
            <BotaoTema />
          </div>
        </div>
      )}
    </header>
  );
};

export default Cabecalho;