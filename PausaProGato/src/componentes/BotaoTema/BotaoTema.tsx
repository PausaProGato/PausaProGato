import { useTheme } from "../../context/theme-provider";

export default function BotaoTema() {
  const { toggleTheme, isDark } = useTheme();
  
  return (
    <button
      onClick={() => toggleTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-full bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-primary-100 dark:hover:bg-primary-900 shadow-lg border border-neutral-200 dark:border-neutral-700 transition-all duration-200"
      title={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}