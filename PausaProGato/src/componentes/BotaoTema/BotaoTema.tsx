import { useTheme } from "../../context/theme-provider";

export default function BotaoTema() {
  const { toggleTheme, isDark } = useTheme();
  
  return (
    <button
      onClick={() => toggleTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-full bg-neutral-50 shadow-lg transition-all duration-200"
      title={isDark 
        ? "Mudar para tema claro" 
        : "Mudar para tema escuro"}
    >
      {isDark
       ? '🐈' 
       : '🐈‍⬛'
       }
    </button>
  );
}