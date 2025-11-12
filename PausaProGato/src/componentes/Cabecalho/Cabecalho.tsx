import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface NavLink {
  to: string;
  label: string;
}

const Cabecalho: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const links: NavLink[] = [
    { to: "/home", label: "Home" },
    { to: "/faq", label: "FAQ" },
    { to: "/sobre", label: "Sobre" },
    { to: "/contato", label: "Contato" },
    { to: "/checkin", label:"Check-in de humor"},
    { to: "/api", label: "API"},
    { to: "/recursos", label: "Recursos/Ajuda"},
  ];

  const handleLogoClick = () => {
    navigate("/home");
    setMenuOpen(false);
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-orange-400 shadow-md">
      <div className="w-full mx-auto flex justify-between items-center p-3">
        <img
          src=""
          alt="Logo PausaProGato"
          className="h- w- cursor-pointer"
          onClick={handleLogoClick}
        />

        {/* menu para telas maiores */}
        <nav className="hidden lg:flex gap-8 p-4 text-orange-700 font-bold text-xl">
          {links.map((link: NavLink) => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:bg-white rounded-xl px-4 py-2 hover:text-orange-400 transition-colors ${
                isActiveLink(link.to) 
                  ? "bg-orange-500 text-white hover:bg-orange-600 hover:text-white" 
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* botão hamburguer */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-between h-6 w-7"
            aria-label="Menu mobile"
          >
            <span
              className={`block h-1 w-full bg-orange-300 transform transition duration-300 ${
                menuOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`block h-1 w-full bg-orange-300 transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block h-1 w-full bg-orange-300 transform transition duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* menu mobile */}
      {menuOpen && (
        <nav className="lg:hidden bg-orange-100 w-full flex flex-col items-center gap-4 py-6 text-orange-700 font-bold text-[1.5rem]">
          {links.map((link: NavLink) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`hover:bg-white rounded-xl px-4 py-2 hover:text-orange-600 transition-colors w-48 text-center ${
                isActiveLink(link.to) 
                  ? "bg-orange-600 text-white hover:bg-orange-700 hover:text-white" 
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Cabecalho;