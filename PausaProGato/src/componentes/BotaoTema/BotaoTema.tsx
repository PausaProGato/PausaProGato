import React from "react";
import { useTheme } from "../../context/ThemeContext";

export const BotaoTema: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-2xl rounded-full bg-paw-accent text-white dark:bg-paw-darkCard dark:text-paw-darkText shadow-md hover:scale-110 transition-transform duration-300"
      aria-label="Alternar tema"
    >
      {theme === "dark" ? "🐈‍⬛" : "🐈"}
    </button>
  );
};
