import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/theme-provider";

type Usuario = {
  id?: number;
  nome: string;
  email: string;
  departamento: string;
  cargo: string;
}

type Humor = {
  nivel: string;
  descricao: string;
}

type NivelEstresse = {
  nivel: string;
  descricao: string;
}

type QualidadeSono = {
  qualidade: string;
  horasDuracao: string;
  observacoes: string;
}

type Pausas = {
  quantidade: string;
  duracaoMedia: string;
}

type Observacoes = {
  texto: string;
}

type ExerciciosFeitos = {
  quantidade: string;
  tipos: string;
}

type RegistroDiario = {
  id?: number;
  data: string;
  usuario: Usuario;
  humor: Humor;
  nivelEstresse: NivelEstresse;
  qualidadeSono: QualidadeSono;
  pausas: Pausas;
  observacoes: Observacoes;
  exerciciosFeitos: ExerciciosFeitos;
}

const RegistroDiarioPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();
  const registroEdicao = location.state as RegistroDiario | undefined;
  
  const [registro, setRegistro] = useState<RegistroDiario>({
    id: registroEdicao?.id ?? undefined,
    data: registroEdicao?.data ?? new Date().toISOString().split('T')[0],
    usuario: {
      id: registroEdicao?.usuario?.id ?? undefined,
      nome: registroEdicao?.usuario?.nome ?? "",
      email: registroEdicao?.usuario?.email ?? "",
      departamento: registroEdicao?.usuario?.departamento ?? "",
      cargo: registroEdicao?.usuario?.cargo ?? "",
    },
    humor: {
      nivel: registroEdicao?.humor?.nivel ?? "",
      descricao: registroEdicao?.humor?.descricao ?? "",
    },
    nivelEstresse: {
      nivel: registroEdicao?.nivelEstresse?.nivel ?? "",
      descricao: registroEdicao?.nivelEstresse?.descricao ?? "",
    },
    qualidadeSono: {
      qualidade: registroEdicao?.qualidadeSono?.qualidade ?? "",
      horasDuracao: registroEdicao?.qualidadeSono?.horasDuracao ?? "",
      observacoes: registroEdicao?.qualidadeSono?.observacoes ?? "",
    },
    pausas: {
      quantidade: registroEdicao?.pausas?.quantidade ?? "",
      duracaoMedia: registroEdicao?.pausas?.duracaoMedia ?? "",
    },
    observacoes: {
      texto: registroEdicao?.observacoes?.texto ?? "",
    },
    exerciciosFeitos: {
      quantidade: registroEdicao?.exerciciosFeitos?.quantidade ?? "",
      tipos: registroEdicao?.exerciciosFeitos?.tipos ?? "",
    },
  });

  const [mensagemSucesso, setMensagemSucesso] = useState("");

  useEffect(() => {
    if (registroEdicao) {
      setRegistro(registroEdicao);
    }
  }, [registroEdicao]);

  const API_URL = "https://pausa-pro-gato-z7i8.onrender.com/registros";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    if (id.includes('.')) {
        const [parent, child] = id.split('.');
        
        setRegistro(prev => {
            const updatedRegistro = { ...prev };

            switch (parent) {
                case 'usuario':
                    updatedRegistro.usuario = { ...prev.usuario, [child]: value };
                    break;
                case 'humor':
                    updatedRegistro.humor = { ...prev.humor, [child]: value };
                    break;
                case 'nivelEstresse':
                    updatedRegistro.nivelEstresse = { ...prev.nivelEstresse, [child]: value };
                    break;
                case 'qualidadeSono':
                    updatedRegistro.qualidadeSono = { ...prev.qualidadeSono, [child]: value };
                    break;
                case 'pausas':
                    updatedRegistro.pausas = { ...prev.pausas, [child]: value };
                    break;
                case 'observacoes':
                    updatedRegistro.observacoes = { ...prev.observacoes, [child]: value };
                    break;
                case 'exerciciosFeitos':
                    updatedRegistro.exerciciosFeitos = { ...prev.exerciciosFeitos, [child]: value };
                    break;
                default:
                    console.warn(`Campo pai desconhecido: ${parent}`);
            }
            
            return updatedRegistro;
        });
    } else {
        setRegistro(prev => ({
            ...prev,
            [id]: value
        }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!registro.usuario.nome || !registro.usuario.email || !registro.data) {
    alert("Por favor, preencha pelo menos nome, email e data.");
    return;
  }

  const url = registro.id ? `${API_URL}/${registro.id}` : API_URL;
  const method = registro.id ? "PUT" : "POST";

  const dataHoje = new Date().toISOString().split("T")[0];

  const dadosParaEnviar = {
    id: registro.id,
    data: registro.data,

    usuario: registro.usuario,

    humor: {
      ...registro.humor,
      data: dataHoje
    },

    nivelEstresse: {
      ...registro.nivelEstresse,
      data: dataHoje
    },

    qualidadeSono: {
      qualidade: registro.qualidadeSono.qualidade,
      horas_duracao: registro.qualidadeSono.horasDuracao,
      observacoes: registro.qualidadeSono.observacoes,
      data: dataHoje
    },

    pausas: {
      quantidade_pausas: registro.pausas.quantidade,
      duracao_media: registro.pausas.duracaoMedia,
      data: dataHoje
    },

    observacoes: {
      texto: registro.observacoes.texto,
      data: dataHoje
    },

    exerciciosFeitos: {
      quantidade_exercicio: registro.exerciciosFeitos.quantidade,
      tipos: registro.exerciciosFeitos.tipos,
      data: dataHoje
    }
  };

  console.log("Dados sendo enviados:", JSON.stringify(dadosParaEnviar, null, 2));

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(dadosParaEnviar),
    });

    console.log("Status da resposta:", response.status);

    const responseText = await response.text();
    console.log("Resposta completa:", responseText);

    if (response.ok) {
      const mensagem = registro.id 
        ? `Registro Diário de ${registro.usuario.nome} atualizado com sucesso!` 
        : `Registro Diário de ${registro.usuario.nome} cadastrado com sucesso!`;

      setMensagemSucesso(mensagem);

      setTimeout(() => {
        setMensagemSucesso("");
        navigate("/home");
      }, 3000);
    } else {
      let errorMessage = "Erro desconhecido";

      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.error || errorData.message || JSON.stringify(errorData);
      } catch {
        errorMessage = responseText || "Erro sem mensagem";
      }

      console.error("Erro detalhado:", errorMessage);
      alert(`Erro ao ${registro.id ? "atualizar" : "cadastrar"} registro: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
    alert("Erro de conexão com o servidor! Verifique sua conexão e tente novamente.");
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
          : "bg-orange-50 border-orange-200"
      }`}>
        <h2 className={`text-[1.875rem] font-bold text-center mb-6 ${
          isDark 
          ? "text-purple-200" 
          : "text-orange-600"
        }`}>
          {registro.id ? "Editar Registro Diário" : "Novo Registro Diário"}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Data */}
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
              Data de Realização do Registro 
            </legend>
            
            <div>
              <label htmlFor="data" className={`block mt-2 font-medium ${
                isDark 
                ? "text-purple-200" 
                : "text-orange-800"
              }`}>
                Data:
              </label>
              <input
                type="date"
                id="data"
                onChange={handleChange}
                value={registro.data}
                required
                className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 ${
                  isDark
                    ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                    : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                }`}
              />
            </div>
          </fieldset>

          {/* Usuário */}
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
                <label htmlFor="usuario.nome" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Nome:
                </label>
                <input
                  type="text"
                  id="usuario.nome"
                  onChange={handleChange}
                  value={registro.usuario.nome}
                  required
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 ${
                    isDark
                      ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                      : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label htmlFor="usuario.email" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Email:
                </label>
                <input
                  type="email"
                  id="usuario.email"
                  onChange={handleChange}
                  value={registro.usuario.email}
                  required
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                    isDark
                      ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                      : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label htmlFor="usuario.departamento" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Departamento:
                </label>
                <input
                  type="text"
                  id="usuario.departamento"
                  onChange={handleChange}
                  value={registro.usuario.departamento}
                  required
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                    isDark
                      ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                      : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label htmlFor="usuario.cargo" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Cargo:
                </label>
                <input
                  type="text"
                  id="usuario.cargo"
                  onChange={handleChange}
                  value={registro.usuario.cargo}
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
              <label htmlFor="humor.nivel" className={`block mt-2 font-medium ${
                isDark 
                ? "text-purple-200" 
                : "text-orange-800"
              }`}>
                Nível de Humor:
              </label>
              <select
                id="humor.nivel"
                onChange={handleChange}
                value={registro.humor.nivel}
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
              <label htmlFor="humor.descricao" className={`block mt-4 font-medium ${
                isDark 
                ? "text-purple-200" 
                : "text-orange-800"
              }`}>
                Descrição do Humor:
              </label>
              <textarea
                id="humor.descricao"
                onChange={handleChange}
                value={registro.humor.descricao}
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
              Estresse
            </legend>
            
            <div>
              <label htmlFor="nivelEstresse.nivel" className={`block mt-2 font-medium ${
                isDark 
                ? "text-purple-200" 
                : "text-orange-800"
              }`}>
                Nível de Estresse:
              </label>
              <select
                id="nivelEstresse.nivel"
                onChange={handleChange}
                value={registro.nivelEstresse.nivel}
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
              <label htmlFor="nivelEstresse.descricao" className={`block mt-4 font-medium ${
                isDark 
                ? "text-purple-200" 
                : "text-orange-800"
              }`}>
                Descrição do Estresse:
              </label>
              <textarea
                id="nivelEstresse.descricao"
                onChange={handleChange}
                value={registro.nivelEstresse.descricao}
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
                <label htmlFor="qualidadeSono.qualidade" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Qualidade do Sono:
                </label>
                <select
                  id="qualidadeSono.qualidade"
                  onChange={handleChange}
                  value={registro.qualidadeSono.qualidade}
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
                <label htmlFor="qualidadeSono.horasDuracao" className={`block mt-2 font-medium ${
                  isDark ? "text-purple-200" : "text-orange-800"
                }`}>
                  Horas de Duração:
                </label>
                <input
                  type="text"
                  id="qualidadeSono.horasDuracao"
                  onChange={handleChange}
                  value={registro.qualidadeSono.horasDuracao}
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
              <label htmlFor="qualidadeSono.observacoes" className={`block mt-4 font-medium ${
                isDark 
                ? "text-purple-200" 
                : "text-orange-800"
              }`}>
                Observações do Sono:
              </label>
              <textarea
                id="qualidadeSono.observacoes"
                onChange={handleChange}
                value={registro.qualidadeSono.observacoes}
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
                <label htmlFor="pausas.quantidade" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Quantidade de Pausas:
                </label>
                <input
                  type="text"
                  id="pausas.quantidade"
                  onChange={handleChange}
                  value={registro.pausas.quantidade}
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                    isDark
                      ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                      : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label htmlFor="pausas.duracaoMedia" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Duração Média:
                </label>
                <input
                  type="text"
                  id="pausas.duracaoMedia"
                  onChange={handleChange}
                  value={registro.pausas.duracaoMedia}
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
                <label htmlFor="exerciciosFeitos.quantidade" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Quantidade:
                </label>
                <input
                  type="text"
                  id="exerciciosFeitos.quantidade"
                  onChange={handleChange}
                  value={registro.exerciciosFeitos.quantidade}
                  className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                    isDark
                      ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                      : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label htmlFor="exerciciosFeitos.tipos" className={`block mt-2 font-medium ${
                  isDark 
                  ? "text-purple-200" 
                  : "text-orange-800"
                }`}>
                  Tipos de Exercícios:
                </label>
                <input
                  type="text"
                  id="exerciciosFeitos.tipos"
                  onChange={handleChange}
                  value={registro.exerciciosFeitos.tipos}
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
              <label htmlFor="observacoes.texto" className={`block mt-2 font-medium ${
                isDark 
                ? "text-purple-200" 
                : "text-orange-800"
              }`}>
                Observações:
              </label>
              <textarea
                id="observacoes.texto"
                onChange={handleChange}
                value={registro.observacoes.texto}
                className={`w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:border-orange-500 dark:focus:border-purple-500 ${
                  isDark
                    ? "border-purple-600 focus:ring-purple-500 bg-purple-800 text-white"
                    : "border-orange-300 focus:ring-orange-500 bg-white text-gray-900"
                }`}
                rows={4}
                placeholder="Digite aqui quaisquer observações adicionais que desejar..."
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