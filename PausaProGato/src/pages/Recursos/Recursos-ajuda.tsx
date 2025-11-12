export default function RecursosAjuda() {
  return (
    <section className="min-h-screen bg-orange-50 py-12 px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-10">
        {/* Introdução */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-orange-700 mb-4">
            Recursos & Ajuda 🧡
          </h1>
          <p className="text-orange-600 text-lg">
            Lembre-se: pedir ajuda é um ato de coragem.  
            Aqui estão alguns recursos que podem apoiar seu bem-estar emocional.
          </p>
        </div>

        {/* Dicas de bem-estar */}
        <div className="bg-orange-100 p-6 rounded-xl">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-orange-700 mb-4">
            Dicas de Bem-Estar 🐾
          </h2>
          <ul className="space-y-3 text-orange-700">
            <li>☕ Faça pausas curtas durante o trabalho para respirar e alongar-se.</li>
            <li>😸 Tire alguns minutos do dia para observar algo que te faz sorrir.</li>
            <li>🌿 Pratique respiração consciente por 1 minuto quando se sentir sobrecarregado.</li>
            <li>🕊️ Não se cobre demais — dias difíceis também fazem parte do processo.</li>
          </ul>
        </div>

        {/* Contatos de emergência */}
        <div className="bg-orange-100 p-6 rounded-xl">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-orange-700 mb-4">
            Apoio Emocional & Emergências 
          </h2>
          <p className="text-orange-700 mb-4">
            Se você estiver passando por um momento difícil, procure ajuda.  
            Você não está sozinho 
          </p>
          <ul className="space-y-3 text-orange-700">
            <li>
              📞 <strong>CVV (Centro de Valorização da Vida)</strong> — 188  
              <span className="block text-sm text-orange-600">Atendimento 24h, gratuito e confidencial</span>
            </li>
            <li>
              💬 <strong>Chat Online:</strong>{" "}
              <a
                href="https://cvv.org.br/chat/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 underline hover:text-orange-500"
              >
                cvv.org.br/chat
              </a>
            </li>
            <li>
              🧠 <strong>SAMU (emergência médica):</strong> 192
            </li>
          </ul>
        </div>

        {/* Recursos externos */}
        <div className="bg-orange-100 p-6 rounded-xl">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-orange-700 mb-4">
             Materiais & Apoio Online 💻
          </h2>
          <ul className="space-y-3 text-orange-700">
            <li>
              🧘‍♀️{" "}
              <a
                href="https://www.mindful.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 underline hover:text-orange-500"
              >
                Mindful.org
              </a>{" "}
              — práticas de atenção plena e relaxamento.
            </li>
            <li>
              🧩{" "}
              <a
                href="https://www.unicef.org/brazil/saude-mental"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 underline hover:text-orange-500"
              >
                UNICEF - Saúde Mental
              </a>{" "}
              — dicas e conteúdos sobre autocuidado emocional.
            </li>
            <li>
              🐱{" "}
              <a
                href="https://www.cvv.org.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 underline hover:text-orange-500"
              >
                CVV - Centro de Valorização da Vida
              </a>
            </li>
          </ul>
        </div>

        {/* Mensagem final fofa 😸 */}
        <div className="text-center text-orange-700 text-lg font-medium mt-8">
          <p>🐈 Lembre-se: até os gatos tiram uma pausa para se cuidar.</p>
          <p>Você merece descanso, carinho e leveza. 💕</p>
        </div>
      </div>
    </section>
  );
}
