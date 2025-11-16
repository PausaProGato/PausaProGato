import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/theme-provider";

type RegistroDiario = {
  id?: number;
  data: string;
  nome: string;
  email: string;
  departamento: string;
  cargo: string;
  nivelHumor: string;
  descricaoHumor: string;
  nivelEstresse: string;
  descricaoEstresse: string;
  qualidadeSono: string;
  horasDuracao: string;
  observacoesSono: string;
  quantidadePausas: string;
  duracaoMediaPausas: string;
  quantidadeExercicios: string;
  tiposExercicios: string;
  observacoesGerais: string;
}

const RegistroDiarioPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();
  const registroEdicao = location.state as RegistroDiario | undefined;
  
  const [registro, setRegistro] = useState<RegistroDiario>({
    id: registroEdicao?.id ?? undefined,
    data: registroEdicao?.data ?? new Date().toISOString().split('T')[0],
    nome: registroEdicao?.nome ?? "",
    email: registroEdicao?.email ?? "",
    departamento: registroEdicao?.departamento ?? "",
    cargo: registroEdicao?.cargo ?? "",
    nivelHumor: registroEdicao?.nivelHumor ?? "",
    descricaoHumor: registroEdicao?.descricaoHumor ?? "",
    nivelEstresse: registroEdicao?.nivelEstresse ?? "",
    descricaoEstresse: registroEdicao?.descricaoEstresse ?? "",
    qualidadeSono: registroEdicao?.qualidadeSono ?? "",
    horasDuracao: registroEdicao?.horasDuracao ?? "",
    observacoesSono: registroEdicao?.observacoesSono ?? "",
    quantidadePausas: registroEdicao?.quantidadePausas ?? "",
    duracaoMediaPausas: registroEdicao?.duracaoMediaPausas ?? "",
    quantidadeExercicios: registroEdicao?.quantidadeExercicios ?? "",
    tiposExercicios: registroEdicao?.tiposExercicios ?? "",
    observacoesGerais: registroEdicao?.observacoesGerais ?? "",
  });

  const [mensagemSucesso, setMensagemSucesso] = useState("");

  useEffect(() => {
    if (registroEdicao) {
      setRegistro(registroEdicao);
    }
  }, [registroEdicao]);

  const API_URL = "esperandorender";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    
    setRegistro({
      ...registro,
      [id]: type === "number" ? (value === "" ? 0 : Number(value)) : value, 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = registro.id ? `${API_URL}/${registro.id}` : API_URL;
    const method = registro.id ? "PUT" : "POST";
    
    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registro),
      });
      
      if (response.ok) {
        const mensagem = registro.id ? 
          `Registro Diário de ${registro.nome} atualizado com sucesso!` : 
          `Registro Diário de ${registro.nome} cadastrado com sucesso!`;
        
        setMensagemSucesso(mensagem);
        
        setTimeout(() => {
          setMensagemSucesso("");
          navigate("/home");
        }, 3000);
        
      } else {
        const erro = await response.text();
        alert(`Erro ao ${registro.id ? "atualizar" : "cadastrar"} registro: ${erro}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor!");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 py-12 transition-colors duration-300 ${
      isDark
        ? "bg-purple-900"
        : "bg-orange-200"
    }`}>
      
      {mensagemSucesso && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg border ${
          isDark
            ? "bg-purple-800 border-purple-600 text-purple-100"
            : "bg-orange-100 border-orange-300 text-orange-800"
        }`}>
          <div className="flex items-center">
            <svg 
              className={`w-5 h-5 mr-2 ${
                isDark 
                ? "text-purple-300" 
                : "text-orange-500"
              }`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="font-medium">{mensagemSucesso}</span>
          </div>
        </div>
      )}

      <section className={`w-full max-w-3xl rounded-2xl shadow-lg p-8 border ${
        isDark
          ? "bg-purple-950 border-purple-700"
          : "bg-white border-orange-200"
      }`}>
        <h2 className={`text-[1.875rem] font-bold text-center mb-6 ${
          isDark 
          ? "text-purple-200" 
          : "text-orange-600"
        }`}>
          {registro.id ? "Editar Registro Diário" : "Novo Registro Diário"}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <fieldset className={`border rounded-lg p-4 ${
            isDark
              ? "border-purple-700"
              : "border-orange-300 bg-orange-50"
          }`}>
            <legend className={`text-[1.125rem] font-semibold px-2 ${
              isDark 
              ? "text-purple-300" 
              : "text-orange-700"
            }`}>
              Usuário
            </legend>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nome" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Nome:
                </label>
                <input
                  type="text"
                  id="nome"
                  onChange={handleChange}
                  value={registro.nome}
                  required
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 ${
                    isDark
                      ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                      : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label htmlFor="email" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={handleChange}
                  value={registro.email}
                  required
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                    isDark
                      ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                      : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label htmlFor="departamento" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Departamento:
                </label>
                <input
                  type="text"
                  id="departamento"
                  onChange={handleChange}
                  value={registro.departamento}
                  required
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                    isDark
                      ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                      : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label htmlFor="cargo" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Cargo:
                </label>
                <input
                  type="text"
                  id="cargo"
                  onChange={handleChange}
                  value={registro.cargo}
                  required
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                    isDark
                      ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                      : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                  }`}
                />
              </div>
            </div>
          </fieldset>

          {/* Humor */}
          <fieldset className={`border rounded-lg p-4 ${
            isDark
              ? "border-purple-600"
              : "border-orange-300 bg-orange-50"
          }`}>
            <legend className={`text-[1.125rem] font-semibold px-2 ${
              isDark 
              ? "text-purple-300" 
              : "text-orange-700"
            }`}>
              Humor
            </legend>
            
            <div>
              <label htmlFor="nivelHumor" className={`block mt-2 font-medium ${
                isDark 
                ? "text-purple-200" 
                : "text-orange-800"
              }`}>
                Nível de Humor:
              </label>
              <select
                id="nivelHumor"
                onChange={handleChange}
                value={registro.nivelHumor}
                className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                  isDark
                    ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                    : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                }`}
              >
                <option value="">Selecione...</option>
                <option value="Baixo">Baixo</option>
                <option value="Moderado">Moderado</option>
                <option value="Alto">Alto</option>
                <option value="Muito Alto">Muito Alto</option>
              </select>
            </div>
            <div>
              <label htmlFor="descricaoHumor" className={`block mt-4 font-medium ${
                isDark 
                ? "text-purple-200" 
                : "text-orange-800"
              }`}>
                Descrição do Humor:
              </label>
              <textarea
                id="descricaoHumor"
                onChange={handleChange}
                value={registro.descricaoHumor}
                className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                  isDark
                    ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                    : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                }`}
                rows={3}
              />
            </div>
          </fieldset>

          {/* Nível de Estresse */}
          <fieldset className={`border rounded-lg p-4 ${
            isDark
              ? "border-purple-600"
              : "border-orange-300 bg-orange-50"
          }`}>
            <legend className={`text-[1.125rem] font-semibold px-2 ${
              isDark 
              ? "text-purple-300" 
              : "text-orange-700"
            }`}>
              Nível de Estresse
            </legend>
            
            <div>
              <label htmlFor="nivelEstresse" className={`block mt-2 font-medium ${
                isDark 
                ? "text-purple-200" 
                : "text-orange-800"
              }`}>
                Nível de Estresse:
              </label>
              <select
                id="nivelEstresse"
                onChange={handleChange}
                value={registro.nivelEstresse}
                className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                  isDark
                    ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                    : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                }`}
              >
                <option value="">Selecione...</option>
                <option value="Baixo">Baixo</option>
                <option value="Moderado">Moderado</option>
                <option value="Alto">Alto</option>
                <option value="Muito Alto">Muito Alto</option>
              </select>
            </div>

            <div>
              <label htmlFor="descricaoEstresse" className={`block mt-4 font-medium ${
                isDark 
                ? "text-purple-200" 
                : "text-orange-800"
              }`}>
                Descrição do Estresse:
              </label>
              <textarea
                id="descricaoEstresse"
                onChange={handleChange}
                value={registro.descricaoEstresse}
                className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                  isDark
                    ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                    : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                }`}
                rows={3}
              />
            </div>
          </fieldset>

          {/* Qualidade do Sono */}
          <fieldset className={`border rounded-lg p-4 ${
            isDark
              ? "border-purple-600 "
              : "border-orange-300 bg-orange-50"
          }`}>
            <legend className={`text-[1.125rem] font-semibold px-2 ${
              isDark 
              ? "text-purple-300" 
              : "text-orange-700"
            }`}>
              Qualidade do Sono
            </legend>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="qualidadeSono" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Qualidade do Sono:
                </label>
                <select
                  id="qualidadeSono"
                  onChange={handleChange}
                  value={registro.qualidadeSono}
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                    isDark
                      ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                      : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                  }`}
                >
                  <option value="">Selecione...</option>
                  <option value="Excelente">Excelente</option>
                  <option value="Boa">Boa</option>
                  <option value="Regular">Regular</option>
                  <option value="Ruim">Ruim</option>
                  <option value="Péssima">Péssima</option>
                </select>
              </div>

              <div>
                <label htmlFor="horasDuracao" className={`block mt-2 font-medium ${
                  isDark ? "text-purple-200" : "text-orange-800"
                }`}>
                  Horas de Duração:
                </label>
                <input
                  type="text"
                  id="horasDuracao"
                  onChange={handleChange}
                  value={registro.horasDuracao}
                  placeholder="ex: 7h30min"
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                    isDark
                      ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                      : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                  }`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="observacoesSono" className={`block mt-4 font-medium ${
                isDark 
                ? "text-purple-200" 
                : "text-orange-800"
              }`}>
                Observações do Sono:
              </label>
              <textarea
                id="observacoesSono"
                onChange={handleChange}
                value={registro.observacoesSono}
                className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                  isDark
                    ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                    : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                }`}
                rows={3}
              />
            </div>
          </fieldset>

          {/* Pausas */}
          <fieldset className={`border rounded-lg p-4 ${
            isDark
              ? "border-purple-600"
              : "border-orange-300 bg-orange-50"
          }`}>
            <legend className={`text-[1.125rem] font-semibold px-2 ${
              isDark 
              ? "text-purple-300" 
              : "text-orange-700"
            }`}>
              Pausas
            </legend>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quantidadePausas" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Quantidade de Pausas:
                </label>
                <input
                  type="text"
                  id="quantidadePausas"
                  onChange={handleChange}
                  value={registro.quantidadePausas}
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                    isDark
                      ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                      : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label htmlFor="duracaoMediaPausas" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Duração Média:
                </label>
                <input
                  type="text"
                  id="duracaoMediaPausas"
                  onChange={handleChange}
                  value={registro.duracaoMediaPausas}
                  placeholder="ex: 15min"
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                    isDark
                      ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                      : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                  }`}
                />
              </div>
            </div>
          </fieldset>

          {/* Exercícios Feitos */}
          <fieldset className={`border rounded-lg p-4 ${
            isDark
              ? "border-purple-600"
              : "border-orange-300 bg-orange-50"
          }`}>
            <legend className={`text-[1.125rem] font-semibold px-2 ${
              isDark 
              ? "text-purple-300" 
              : "text-orange-700"
            }`}>
              Exercícios Feitos
            </legend>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quantidadeExercicios" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Quantidade:
                </label>
                <input
                  type="text"
                  id="quantidadeExercicios"
                  onChange={handleChange}
                  value={registro.quantidadeExercicios}
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                    isDark
                      ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                      : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label htmlFor="tiposExercicios" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Tipos de Exercícios:
                </label>
                <input
                  type="text"
                  id="tiposExercicios"
                  onChange={handleChange}
                  value={registro.tiposExercicios}
                  placeholder="ex: Caminhada, Yoga"
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                    isDark
                      ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                      : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                  }`}
                />
              </div>
            </div>
          </fieldset>

          {/* Observações Gerais */}
          <fieldset className={`border rounded-lg p-4 ${
            isDark
              ? "border-purple-600"
              : "border-orange-300 bg-orange-50"
          }`}>
            <legend className={`text-[1.125rem] font-semibold px-2 ${
              isDark 
              ? "text-purple-300" 
              : "text-orange-700"
            }`}>
              Observações Gerais
            </legend>
            
            <div>
              <label htmlFor="observacoesGerais" className={`block mt-2 font-medium ${
                isDark 
                ? "text-purple-200" 
                : "text-orange-800"
              }`}>
                Observações:
              </label>
              <textarea
                id="observacoesGerais"
                onChange={handleChange}
                value={registro.observacoesGerais}
                className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                  isDark
                    ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                    : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                }`}
                rows={4}
                placeholder="Digite aqui quaisquer observações adicionais..."
              />
            </div>
          </fieldset>

          <button
            type="submit"
            className={`flex justify-center w-3/4 mx-auto text-white font-bold py-3 rounded-lg transition-colors duration-200 shadow-md ${
              isDark
                ? "bg-purple-800 hover:bg-purple-700"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {registro.id ? "Atualizar Registro" : "Cadastrar Registro"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default RegistroDiarioPage;