import { useTheme } from "../../context/theme-provider";

function Sobre() {
  const { isDark } = useTheme();

  return (
    <section className={`min-h-screen py-12 px-6 flex flex-col items-center transition-colors duration-300 ${
      isDark 
        ? "bg-linear-to-br from-purple-900 to-violet-900" 
        : "bg-linear-to-br from-orange-200 to-orange-300"
    }`}>
      
      <div className={`max-w-3xl p-10 rounded-2xl shadow-xl space-y-8 transition-colors duration-300 ${
        isDark 
          ? "bg-linear-to-br from-purple-800 to-violet-800 border border-purple-600" 
          : "bg-linear-to-br from-orange-50 to-white border border-orange-200"
      }`}>
        
        <h1 className={`text-4xl font-bold text-center ${
          isDark 
          ? "text-white" 
          : "text-orange-700"
        }`}>
          Sobre o PausaProGato{" "}
          <span className={isDark ? "text-purple-300" : "text-orange-500"}>
            🐱
          </span>
        </h1>

        <p className={`leading-relaxed text-lg ${
          isDark 
          ? "text-purple-200" 
          : "text-orange-700"
        }`}>
          O <strong className={isDark ? "text-purple-100" : "text-orange-800"}>
            PausaProGato
          </strong> nasceu com o propósito de trazer leveza,
          autocuidado e bem-estar para o dia a dia de quem vive a rotina intensa do trabalho.
          Acreditamos que pequenas pausas podem transformar o humor e a produtividade —
          e nada melhor do que um toque de fofura que gatinhos podem nos trazer para isso! 
        </p>

        {/* Parágrafo 2 */}
        <p className={`leading-relaxed text-lg ${
          isDark ? "text-purple-200" : "text-orange-700"
        }`}>
          A plataforma permite que os usuários façam um{" "}
          <strong className={isDark ? "text-purple-100" : "text-orange-800"}>
            check-in emocional
          </strong>,
          registrem seu humor do dia e acessem{" "}
          <strong className={isDark ? "text-purple-100" : "text-orange-800"}>
            recursos de apoio
          </strong> para momentos
          de cansaço, ansiedade ou estresse. É um espaço gentil para cuidar da mente,
          inspirado em pesquisas sobre saúde mental no ambiente de trabalho.
        </p>

        {/* Parágrafo 3 */}
        <p className={`leading-relaxed text-lg ${
          isDark ? "text-purple-200" : "text-orange-700"
        }`}>
          O PausaProGato foi criado para lembrar que{" "}
          <em className={`italic ${isDark ? "text-purple-100" : "text-orange-600"}`}>
            pausar também é um ato de coragem
          </em>.
        </p>
        <div className={`text-center font-medium mt-8 p-4 rounded-lg ${
          isDark 
            ? "bg-purple-700 text-purple-100" 
            : "bg-orange-100 text-orange-600"
        }`}>
          <p className="text-lg">
            Cuide de si como cuidaria de um gatinho: com carinho e paciência.
          </p>
        </div>
        <div className={`mt-6 p-6 rounded-lg border-l-4 ${
          isDark 
            ? "bg-purple-900 border-purple-400" 
            : "bg-orange-50 border-orange-400"
        }`}>
          <h3 className={`text-xl font-semibold mb-3 ${
            isDark ? "text-purple-100" : "text-orange-800"
          }`}>
            Nossa Missão
          </h3>
          <p className={isDark ? "text-purple-200" : "text-orange-700"}>
            Criar um ambiente digital seguro e acolhedor onde as pessoas possam 
            reconhecer e cuidar de suas emoções, promovendo equilíbrio entre vida 
            profissional e bem-estar mental.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Sobre;