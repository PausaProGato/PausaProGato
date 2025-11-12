import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FAQItemProps {
  title: string;
  question: string;
  answer: string;
  question2: string;
  answer2: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ title, question, answer, question2, answer2 }) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="mb-4 bg-orange-100 rounded-2xl shadow-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center bg-orange-400 p-4 hover:bg-orange-500 focus:outline-none transition-colors"
      >
        <span className="font-bold text-[1.125rem] text-left text-white">{title}</span>
        <span
          className={`ml-2 transform transition-transform duration-300 text-white ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="p-4 space-y-4 text-orange-700">
          <div className="border-b border-orange-200 pb-3">
            <h3 className="font-semibold text-orange-800 mb-2 text-lg">{question}</h3>
            <p className="text-orange-600 leading-relaxed">{answer}</p>
          </div>
          <div>
            <h3 className="font-semibold text-orange-800 mb-2 text-lg">{question2}</h3>
            <p className="text-orange-600 leading-relaxed">{answer2}</p>
          </div>
        </div>
      )}
    </div>
  );
};

interface FAQData {
  title: string;
  question: string;
  answer: string;
  question2: string;
  answer2: string;
}

export default function FAQ() {
  const navigate = useNavigate();
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("");

  const faqs: FAQData[] = [
    {
      title: "categoria1",
      question: "1.?",
      answer: "resposta1",
      question2: "2.?",
      answer2: "resposta2",
    },
    {
      title: "categoria2",
      question: "1.?",
      answer: "resposta1",
      question2: "2.?",
      answer2: "resposta2",
    },
    {
      title: "categoria3",
      question: "1.?",
      answer: "resposta1",
      question2: "2.?",
      answer2: "resposta2",
    },
    {
      title: "categoria4",
      question: "1.?",
      answer: "resposta1",
      question2: "2.?",
      answer2: "resposta2",
    },
    {
      title: "categoria5",
      question: "1.?",
      answer: "resposta1",
      question2: "2.?",
      answer2: "resposta2",
    },
    {
      title: "categoria6",
      question: "1.?",
      answer: "resposta1",
      question2: "2.?",
      answer2: "resposta2",
    },
  ];

  const handleVoltarHome = () => {
    navigate("/");
  };

  const handleLimparCategoria = () => {
    setCategoriaAtiva("");
  };

  const faqAtiva = faqs.find(faq => faq.title === categoriaAtiva);

  return (
    <div className="min-h-screen rounded-2xl bg-orange-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-500 mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-orange-600 text-lg mb-4">
            Encontre respostas para as dúvidas mais comuns sobre o PausaProGato
          </p>

        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {faqs.map((faq, index) => (
            <button
              key={index}
              onClick={() => setCategoriaAtiva(faq.title)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                categoriaAtiva === faq.title
                  ? "bg-orange-400 text-white shadow-lg"
                  : "bg-white text-orange-400 border border-orange-400 hover:bg-orange-600 hover:text-white"
              }`}
            >
              {faq.title}
            </button>
          ))}
        </div>

        {categoriaAtiva && (
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-orange-500">
                {categoriaAtiva}
              </h2>
              <button
                onClick={handleLimparCategoria}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
              >
                Ver Todas as Categorias
              </button>
            </div>
            
            {faqAtiva && (
              <FAQItem
                title={faqAtiva.title}
                question={faqAtiva.question}
                answer={faqAtiva.answer}
                question2={faqAtiva.question2}
                answer2={faqAtiva.answer2}
              />
            )}
          </div>
        )}

        {!categoriaAtiva && (
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-center text-orange-400 mb-6">
              Todas as Perguntas
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  title={faq.title}
                  question={faq.question}
                  answer={faq.answer}
                  question2={faq.question2}
                  answer2={faq.answer2}
                />
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={handleVoltarHome}
            className="bg-orange-400 text-white px-8 py-3 rounded-lg hover:bg-orange-500 transition-colors font-semibold shadow-lg"
          >
            ← Voltar para Home
          </button>
        </div>

        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Não encontrou o que procurava? Entre em contato conosco!</p>
        </div>
      </div>
    </div>
  );
}