import { useTheme } from "../../context/theme-provider";

function Integrantes() {
  const { isDark } = useTheme();

  const integrantes = [
    {
      nome: "Agatha Yie Won Yun",
      rm: "RM:561507",
      turma: "1TDSA",
      foto: "/img/icon_aywy.jpeg",
      github: "https://github.com/agathayun",
      linkedin: "https://www.linkedin.com/in/agatha-yun-75334535b/",
    },
    {
      nome: "Ana Claudia Fernandes Martins",
      rm: "RM:561190",
      turma: "1TDSA",
      foto: "/img/icon_anac.jpeg",
      github: "https://github.com/AnaCFmartins",
      linkedin: "https://www.linkedin.com/in/ana-claudia-fernandes-martins/",
    },
    {
      nome: "Samantha Faruolo Galdi",
      rm: "RM:554794",
      turma: "1TDSA",
      foto: "/img/icon_smf.jpeg",
      github: "https://github.com/samyfg41",
      linkedin: "https://www.linkedin.com/in/samantha-faruolo-galdi-534422301/",
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col items-center py-12 px-6 transition-colors duration-300 ${
      isDark 
        ? "bg-purple-900" 
        : "bg-orange-200"
    }`}>
      
      <div className="text-center mb-12">
        <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
          isDark 
          ? "text-purple-50" 
          : "text-orange-700"
        }`}>
          Nossa Equipe
        </h2>
        <p className={`text-lg ${
          isDark 
          ? "text-purple-100" 
          : "text-orange-600"
        }`}>
          Conheça as desenvolvedoras por trás do PausaProGato
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-1 max-w-6xl w-full">
        {integrantes.map((pessoa, index) => (
          <div
            key={index}
            className={`rounded-2xl shadow-xl p-8 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
              isDark 
                ? "bg-purple-950 border border-purple-700 hover:border-purple-400" 
                : "bg-orange-50 border border-orange-200 hover:border-orange-300"
            }`}
          >
            <img
              src={pessoa.foto}
              alt={pessoa.nome}
              className={`w-32 h-32 rounded-full object-cover shadow-lg mb-6 ${
                isDark 
                  ? "ring-3 ring-purple-600" 
                  : "ring-3 ring-orange-400"
              }`}
            />
            
            <h3 className={`text-xl font-semibold text-center mb-2 ${
              isDark 
              ? "text-purple-50"  
              : "text-orange-800"
            }`}>
              {pessoa.nome}
            </h3>
            
            <p className={`font-medium mb-1 ${
              isDark 
              ? "text-purple-200" 
              : "text-orange-700"
            }`}>
              {pessoa.rm}
            </p>
            
            <p className={`mb-6 ${
              isDark 
              ? "text-purple-300" 
              : "text-orange-600"
            }`}>
              Turma: {pessoa.turma}
            </p>

            <div className="flex gap-6 mt-4">
              <a
                href={pessoa.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110 ${
                  isDark 
                    ? "text-purple-200 hover:text-purple-50" 
                    : "text-orange-600 hover:text-orange-800"
                }`}
                title="GitHub"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDark 
                    ? "bg-purple-800 hover:bg-purple-600" 
                    : "bg-orange-100 hover:bg-orange-200"
                }`}>
                  <img 
                    src="/img/github.png" 
                    alt="GitHub" 
                    className="w-6 h-6" 
                  />
                </div>
                <span className="text-sm font-medium">GitHub</span>
              </a>

              <a
                href={pessoa.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110 ${
                  isDark 
                    ? "text-purple-200 hover:text-purple-50" 
                    : "text-blue-600 hover:text-blue-800"
                }`}
                title="LinkedIn"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDark 
                    ? "bg-purple-800 hover:bg-purple-600" 
                    : "bg-blue-100 hover:bg-blue-200"
                }`}>
                  <img 
                    src="/img/linkedin.png" 
                    alt="LinkedIn" 
                    className="w-6 h-6" 
                  />
                </div>
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Integrantes;