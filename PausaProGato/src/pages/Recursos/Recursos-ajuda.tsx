import { useTheme } from "../../context/theme-provider";

export default function RecursosAjuda() {
  const { isDark } = useTheme();

  return (
    <section className={`min-h-screen py-12 px-6 flex flex-col items-center transition-colors duration-300 ${
      isDark 
        ? "bg-purple-900" 
        : "bg-orange-200"
    }`}>
      
      <div className={`max-w-4xl w-full rounded-2xl shadow-xl p-8 space-y-10 transition-colors duration-300 ${
        isDark 
          ? "bg-purple-950 border border-purple-600" 
          : "bg-orange-50 border border-orange-200"
      }`}>
        
        <div className="text-center">
          <h1 className={`text-3xl font-bold mb-4 ${
            isDark 
            ? "text-purple-50" 
            : "text-orange-700"
          }`}>
            Recursos & Ajuda{" "}
            <span className={isDark 
              ? "text-purple-300" 
              : "text-orange-500"}>
              🧡
            </span>
          </h1>
          <p className={`text-lg ${
            isDark 
            ? "text-purple-200" 
            : "text-orange-600"
          }`}>
            Lembre-se: pedir ajuda é um ato de coragem.  
            Aqui estão alguns recursos que podem apoiar seu bem-estar emocional.
          </p>
        </div>

        {/* Dicas de bem-estar */}
        <div className={`p-6 rounded-xl transition-colors duration-300 ${
          isDark 
            ? "bg-purple-900 border border-purple-500" 
            : "bg-orange-100 border border-orange-200"
        }`}>
          <h2 className={`flex items-center gap-2 text-2xl font-semibold mb-4 ${
            isDark 
            ? "text-purple-100" 
            : "text-orange-700"
          }`}>
            <span className={isDark 
              ? "text-purple-300" 
              : "text-orange-500"}>
              🐾
            </span>
            Dicas de Bem-Estar
          </h2>
          <ul className={`space-y-3 ${
            isDark 
            ? "text-purple-200" 
            : "text-orange-700"
          }`}>
            <li className="flex items-start gap-2">
              <span className={isDark 
                ? "text-purple-300" 
                : "text-orange-500"}
              >•</span>
              Faça pausas curtas durante o trabalho para respirar e alongar-se.
            </li>
            <li className="flex items-start gap-2">
              <span className={isDark 
                ? "text-purple-300" 
                : "text-orange-500"}
              >•</span>
              Tire alguns minutos do dia para observar algo que te faz sorrir.
            </li>
            <li className="flex items-start gap-2">
              <span className={isDark 
                ? "text-purple-300" 
                : "text-orange-500"}
              >•</span>
              Pratique respiração consciente por 1 minuto quando se sentir sobrecarregado.
            </li>
            <li className="flex items-start gap-2">
              <span className={isDark 
                ? "text-purple-300" 
                : "text-orange-500"}
              >•</span>
              Não se cobre demais — dias difíceis também fazem parte do processo.
            </li>
          </ul>
        </div>

        {/* Contatos de emergência */}
        <div className={`p-6 rounded-xl transition-colors duration-300 ${
          isDark 
            ? "bg-purple-900 border border-purple-500" 
            : "bg-orange-100 border border-orange-200"
        }`}>
          <h2 className={`flex items-center gap-2 text-2xl font-semibold mb-4 ${
            isDark 
            ? "text-purple-100" 
            : "text-orange-700"
          }`}>
            Apoio Emocional & Emergências
          </h2>
          <p className={`mb-4 ${
            isDark 
            ? "text-purple-200" 
            : "text-orange-700"
          }`}>
            Se você estiver passando por um momento difícil, procure ajuda.  
            Você não está sozinho.
          </p>
          <ul className={`space-y-4 ${
            isDark 
            ? "text-purple-200" 
            : "text-orange-700"
          }`}>
            <li>
              <strong className={
                isDark 
                ? "text-purple-100" 
                : "text-orange-800"}
              >
                CVV (Centro de Valorização da Vida)
              </strong> — <span className="font-bold">188</span>  
              <span className={`block text-sm mt-1 ${
                isDark 
                ? "text-purple-300" 
                : "text-orange-600"
              }`}>
                Atendimento 24h, gratuito e confidencial
              </span>
            </li>
            <li>
              <strong className={
                isDark 
                ? "text-purple-100" 
                : "text-orange-800"}
              >
                Chat Online:
              </strong>{" "}
              <a
                href="https://cvv.org.br/chat/"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline hover:opacity-80 transition-opacity ${
                  isDark 
                  ? "text-purple-300" 
                  : "text-orange-600"
                }`}
              >
                cvv.org.br/chat
              </a>
            </li>
            <li>
              <strong className={
                isDark 
                ? "text-purple-100" 
                : "text-orange-800"}
              >
                SAMU (emergência médica):
              </strong> <span className="font-bold">192</span>
            </li>
            <li>
              <strong className={
                isDark 
                ? "text-purple-100" 
                : "text-orange-800"}
              >
                Polícia (emergência):
              </strong> <span className="font-bold">190</span>
            </li>
          </ul>
        </div>

        <div className={`p-6 rounded-xl transition-colors duration-300 ${
          isDark 
            ? "bg-purple-900 border border-purple-500" 
            : "bg-orange-100 border border-orange-200"
        }`}>
          <h2 className={`flex items-center gap-2 text-2xl font-semibold mb-4 ${
            isDark 
            ? "text-purple-100" 
            : "text-orange-700"
          }`}>
            Materiais & Apoio Online
          </h2>
          <ul className={`space-y-3 ${
            isDark 
            ? "text-purple-200" 
            : "text-orange-700"
          }`}>
            <li>
              <a
                href="https://www.mindful.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline hover:opacity-80 transition-opacity ${
                  isDark 
                  ? "text-purple-300" 
                  : "text-orange-600"
                }`}
              >
                Mindful.org
              </a>{" "}
              — práticas de atenção plena e relaxamento.
            </li>
            <li>
              <a
                href="https://www.cvv.org.br/"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline hover:opacity-80 transition-opacity ${
                  isDark 
                  ? "text-purple-300" 
                  : "text-orange-600"
                }`}
              >
                CVV - Centro de Valorização da Vida
              </a>{" "}
              — site oficial com diversos recursos.
            </li>
            <li>
              <a
                href="https://www.vitat.com.br/bem-estar/saude-mental"
                target="_blank"
                rel="noopener noreferrer"
                className={`underline hover:opacity-80 transition-opacity ${
                  isDark 
                  ? "text-purple-300" 
                  : "text-orange-600"
                }`}
              >
                Vitat - Saúde Mental
              </a>{" "}
              — artigos e orientações sobre bem-estar.
            </li>
          </ul>
        </div>
        
        <div className={`text-center ${
            isDark
            ? "text-purple-200"
            : "text-orange-600"}`}>
          <p>
            <span>
            {
              isDark
              ? '🐈‍⬛'
              : '🐈' 
            }
            </span>{" "}
            Lembre-se: até os gatos tiram uma pausa para se cuidar.
          </p>
          <p>Você merece descanso, carinho e leveza.</p>
        </div>

        <div className={`p-4 rounded-lg border-l-4 text-sm ${
          isDark 
            ? "bg-purple-900 border-purple-400 text-purple-200" 
            : "bg-orange-50 border-orange-400 text-orange-700"
        }`}>
          <p>
            <strong>Importante:</strong> Estes recursos são para apoio emocional. 
            Em casos de emergência ou crise, sempre procure ajuda profissional qualificada.
          </p>
        </div>
      </div>
    </section>
  );
}