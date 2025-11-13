import { useTheme } from "../../context/theme-provider";

export default function Footer(){
    const { isDark } = useTheme();
    return(
        <p
          className={`w-full mt-auto py-4 text-center font-semibold ${
            isDark
            ? "bg-violet-950 text-purple-100 shadow-lg"
            : "bg-orange-600 text-orange-900 shadow-md"
          }`}
        >
            &copy; 2025- PausaProGato- Todos os direitos reservados
        </p>
    );
}