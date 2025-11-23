import { useState } from 'react';
import { useTheme } from '../../context/theme-provider';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const { isDark } = useTheme();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqItems: FAQItem[] = [
    {
      question: "O que é o PausaProGato?",
      answer: "O PausaProGato é uma plataforma inovadora focada no bem-estar de profissionais, oferecendo ferramentas para monitoramento de humor, pausas conscientes e recursos para melhorar a qualidade de vida no ambiente de trabalho."
    },
    {
      question: "Como funciona o check-in de humor?",
      answer: "No check-in de humor, você pode registrar como está se sentindo diariamente. O sistema oferece uma escala de emoções e espaço para comentários, ajudando você a acompanhar seu estado emocional ao longo do tempo."
    },
    {
      question: "Meus dados são seguros?",
      answer: "Sim! Levamos a privacidade muito a sério. Seus dados de humor e informações pessoais são armazenados localmente no seu navegador e não são compartilhados com terceiros sem sua autorização."
    },
    {
      question: "Posso usar o site no celular?",
      answer: "Com certeza! O PausaProGato é totalmente responsivo e funciona em smartphones, tablets e computadores."
    },
    {
      question: "O site é gratuito?",
      answer: "Sim! O PausaProGato é completamente gratuito. Acreditamos que o bem-estar no trabalho deve ser acessível para todos."
    },
    {
      question: "O que significa 'pausa consciente'?",
      answer: "São pausas intencionais durante o trabalho onde você pratica mindfulness, respiração ou simplesmente se desconecta por alguns minutos. Essas pausas ajudam a prevenir burnout e melhoram a produtividade."
    },
    {
      question: "Como o PausaProGato ajuda na saúde mental?",
      answer: "Através do acompanhamento constante do humor e recursos educativos, ajudamos você a desenvolver maior autoconsciência emocional e hábitos mais saudáveis no trabalho."
    },
    {
      question: "Como sugiro novas funcionalidades?",
      answer: "Adoramos feedback! Você pode enviar sugestões através da nossa página de contato"
    }
  ];

  return (
    <div className={`min-h-screen py-12 px-6 transition-colors duration-300 ${
      isDark 
        ? "bg-purple-900" 
        : "bg-orange-200"
    }`}>
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark 
            ? "text-purple-50" 
            : "text-orange-800"
          }`}>
            Perguntas Frequentes
          </h1>
          <p className={`text-lg ${
            isDark 
            ? "text-purple-200" 
            : "text-orange-600"
          }`}>
            Encontre respostas para as dúvidas mais comuns sobre o PausaProGato
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl transition-all duration-300 border-2 ${
                isDark
                  ? "bg-purple-950 border border-purple-600 hover:border-purple-500"
                  : "bg-orange-50 border border-orange-300 hover:border-orange-300"
              }`}
            >
              <button
                onClick={() => toggleItem(index)}
                className={`w-full px-6 py-4 text-left flex justify-between items-center transition-colors ${
                  isDark 
                  ? "text-purple-50" 
                  : "text-orange-900"
                }`}
              >
                <span className="font-semibold text-lg pr-4">{item.question}</span>
                <span className={`text-2xl transition-transform duration-300 ${
                  openItems.includes(index) ? 'rotate-180' : ''
                }`}>
                  {isDark 
                  ? '🔮' 
                  : '🐾'}
                </span>
              </button>
              
              {openItems.includes(index) && (
                <div className={`px-6 pb-4 border-t ${
                  isDark 
                  ? "border-purple-600" 
                  : "border-orange-200"
                }`}>
                  <p className={`pt-3 ${
                    isDark 
                    ? "text-purple-200" 
                    : "text-orange-700"
                  }`}>
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        </div>
      </div>
  );
}