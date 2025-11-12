import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Feedback = {
  id?: number;
  nome: string;
  idade: number;
  tipoDispositivo: string;
  sistemaDispositivo: string;
  experiencia: string;
  sugestao: string;
  tempo: string;
  frequencia: string;
  pergunta: string;
  tipoDificuldade: string;
  descricaoDificuldade: string;
  avaliar: number;
}

const api = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const feedbackEdicao = location.state as Feedback | undefined;
  const [ feedback, setFeedback ] = useState<Feedback>({
    id: feedbackEdicao?.id ?? undefined,
    nome: feedbackEdicao?.nome ?? "",
    idade: feedbackEdicao?.idade ?? 0,
    tipoDispositivo: feedbackEdicao?.tipoDispositivo ?? "",
    sistemaDispositivo: feedbackEdicao?.sistemaDispositivo ?? "",
    experiencia: feedbackEdicao?.experiencia ?? "",
    sugestao: feedbackEdicao?.sugestao ?? "",
    tempo: feedbackEdicao?.tempo ?? "",
    frequencia: feedbackEdicao?.frequencia ?? "",
    pergunta: feedbackEdicao?.pergunta ?? "",
    tipoDificuldade: feedbackEdicao?.tipoDificuldade ?? "",
    descricaoDificuldade: feedbackEdicao?.descricaoDificuldade ?? "",
    avaliar: feedbackEdicao?.avaliar ?? 0,
  });

  useEffect(() => {
    if(feedbackEdicao) {
      setFeedback(feedbackEdicao);
    }
  }, [feedbackEdicao]);

  const API_URL = "";

  const url = feedback.id ? `${API_URL}/${feedback.id}` : API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    
    setFeedback({
      ...feedback,
      [id]: type === "number" ? (value === "" ? 0 : Number(value)) : value, 
    });
  };

  const handlePost = async () => {
    const method = feedback.id ? "PUT" : "POST";
    try{
      const response = await fetch(url, {
        method: method,
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(feedback),
      });
      if(response.ok){
        alert(feedback.id ? `Feedback de ${feedback.nome} atualizado com sucesso!` : `Feedback de ${feedback.nome} cadastrado no sistema com sucesso!`);
        navigate("/");
      } else{
        const erro = await response.text();
        alert(feedback.id ? "Erro ao atualizar feedback: " + erro : "Erro ao cadastrar feedback: " + erro);
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor!");
    } 
  }

  const [mensagem, setMensagem] = useState(false);

  const mostrarMensagem = (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem(true);

    setTimeout(() => {
      setMensagem(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200 rounded-2xl py-10 px-4">
      <section className="w-full max-w-3xl bg-gray-100 rounded-2xl shadow-lg p-8">
        <h2 className="text-[1.875rem] font-bold text-center mb-6 text-[#092d5c]">
        </h2>

        <form className="space-y-6" onSubmit={mostrarMensagem}>
          <fieldset className="border border-gray-300 rounded-lg p-4">
            <legend className="text-[1.125rem] font-semibold text-gray-700">
            </legend>
            <p className="text-gray-600">
              
            </p>
          </fieldset>

          {/* Usuário */}
          <fieldset className="border border-gray-300 rounded-lg p-4">
            <legend className="text-[1.125rem] font-semibold text-gray-700">Usuário</legend>
            <label htmlFor="nome" className="block mt-2 font-medium">
              Informe seu nome:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              onChange={handleChange}
              value={feedback.nome} 
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="idade" className="block mt-4 font-medium">
              Informe sua idade:
            </label>
            <input
              type="number"
              id="idade"
              name="idade"
              onChange={handleChange}
              value={feedback.idade} 
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </fieldset>

          {/* Dispositivo */}
          <fieldset className="border border-gray-300 rounded-lg p-4">
            <legend className="text-[1.125rem] font-semibold text-gray-700">Dispositivo Acesso</legend>
            <label htmlFor="dispositivo" className="block mt-2 font-medium">
              Tipo de dispositivo:
            <input
              type="text"
              id="tipoDispositivo"
              name="dispositivo"
              onChange={handleChange}
              value={feedback.tipoDispositivo} 
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              </label>

            <label htmlFor="sistema" className="block mt-4 font-medium">
              Sistema do dispositivo:
            <input
              type="text"
              id="sistemaDispositivo"
              name="sistema"
              onChange={handleChange}
              value={feedback.sistemaDispositivo} 
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              </label>
          </fieldset>

          {/* Feedback */}
          <fieldset className="border border-gray-300 rounded-lg p-4">
            <legend className="text-[1.125rem] font-semibold text-gray-700">Feedback</legend>
            <label htmlFor="experiencia" className="block mt-2 font-medium">
              Como foi sua experiência?
            </label>
            <input
              type="text"
              id="experiencia"
              name="experiencia"
              onChange={handleChange}
              value={feedback.experiencia} 
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="sugestao" className="block mt-4 font-medium">
              Sugestão de melhoria:
            </label>
            <input
              type="text"
              id="sugestao"
              name="sugestao"
              onChange={handleChange}
              value={feedback.sugestao} 
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </fieldset>

          {/* Dificuldade */}
          <fieldset className="border border-gray-300 rounded-lg p-4">
            <legend className="text-[1.125rem] font-semibold text-gray-700">Dificuldade</legend>
            <label htmlFor="infoDificuldade" className="block mt-2 font-medium">
              Tipo de dificuldade:
            <input
              type="text"
              id="tipoDificuldade"
              name="infoDificuldade"
              onChange={handleChange}
              value={feedback.tipoDificuldade} 
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              </label>

            <label htmlFor="ds-dificuldade" className="block mt-4 font-medium">
              Descreva a dificuldade:
            <input
              type="text"
              id="descricaoDificuldade"
              name="ds-dificuldade"
              onChange={handleChange}
              value={feedback.descricaoDificuldade} 
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              </label>
          </fieldset>

          {/* Pergunta Principal */}
          <fieldset className="border border-gray-300 rounded-lg p-4">
            <legend className="text-[1.125rem] font-semibold text-gray-700">Pergunta Principal</legend>
            <label htmlFor="perg-princ" className="block mt-2 font-medium">
              Você gostou do site NavegaHC?
            <input
              type="text"
              id="pergunta"
              name="perg-princ"
              onChange={handleChange}
              value={feedback.pergunta} 
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              </label>
          </fieldset>

          {/* Tempo de Uso */}
          <fieldset className="border border-gray-300 rounded-lg p-4">
            <legend className="text-[1.125rem] font-semibold text-gray-700">Tempo de Uso</legend>
            <label htmlFor="tempo" className="block mt-2 font-medium">
              Há quanto tempo você conhece ou usa o site?
            </label>
            <input
              type="text"
              id="tempo"
              name="tempo"
              onChange={handleChange}
              value={feedback.tempo} 
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="frequencia" className="block mt-4 font-medium">
              Com que frequência você utiliza o site?
            </label>
            <input
              type="text"
              id="frequencia"
              name="frequencia"
              onChange={handleChange}
              value={feedback.frequencia} 
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </fieldset>

          {/* Avaliação */}
          <fieldset className="border border-gray-300 rounded-lg p-4">
            <legend className="text-[1.125rem] font-semibold text-gray-700">Avaliação</legend>
            <label htmlFor="avaliacao" className="block mt-2 font-medium">
              Avaliação (1 a 5):
            <input
              type="number"
              id="avaliar"
              name="avaliacao"
              min="1"
              max="5"
              step="0.1"
              onChange={handleChange}
              value={feedback.avaliar} 
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </fieldset>

          <button
            onClick={handlePost}
            type="submit"
            className="flex justify-center w-3/4 mx-auto bg-[#092d5c] text-white font-bold py-2 rounded hover:bg-blue-900"
          >
            {feedback.id ? "Atualizar" : "Cadastrar"}
          </button>
        </form>
      </section>

      {mensagem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-bold text-green-700 mb-4">
              ✔️ Formulário enviado com sucesso!
            </h2>
            <button
              onClick={() => setMensagem(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default api;