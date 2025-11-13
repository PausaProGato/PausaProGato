import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/theme-provider";
import BotaoTema from "../../componentes/BotaoTema/BotaoTema";

type AvatarKey = "Gato Rajado" | "Gato Branco" | "Gato Branco Sapo" | "Gato Rajado Sapo";

const avatarImages: Record<AvatarKey, string> = {
  "Gato Rajado": "/img/gatorajado.png",
  "Gato Branco": "/img/gatobranco.png",
  "Gato Branco Sapo": "/img/gatobrancosapo.png",
  "Gato Rajado Sapo": "/img/gatosapo.png",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [selectedAvatar, setSelectedAvatar] = useState<AvatarKey | ''>('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedAvatar) {
      alert('Por favor, escolha um avatar!');
      return;
    }

    sessionStorage.setItem("usuario", JSON.stringify({ username, avatar: selectedAvatar }));

    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/home");
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center px-6 py-12 transition-colors duration-300 ${
      isDark
        ? "bg-linear-to-br from-purple-900 to-violet-900"
        : "bg-linear-to-br from-orange-200 to-orange-300"
    }`}>

      <div className="absolute top-6 right-6 z-10">
        <BotaoTema />
      </div>

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">

        <div className="space-y-6">
          <h1 className={`sm:text-[2.75rem] text-[3rem] font-extrabold leading-tight ${
            isDark
              ? "text-white"
              : "text-orange-800"
          }`}>
            Bem-vindo ao <span className={isDark ? "text-purple-400" : "text-orange-400"}>
              PausaProGato
            </span>
          </h1>
          <p className={`text-[1.125rem] leading-relaxed ${
            isDark
              ? "text-purple-200"
              : "text-orange-700"
          }`}>
            O <span className="font-semibold">PausaProGato</span> é um site criado para
            monitorar o humor do usuário, oferecendo um ambiente leve, acolhedor e focado em bem-estar.
          </p>
        </div>

        <div className={`p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md mx-auto transition-colors duration-300 ${
          isDark
            ? "bg-linear-to-br from-purple-800 to-violet-800 border border-purple-600"
            : "bg-orange-50 border border-orange-200"
        }`}>
          <h2 className={`text-3xl font-bold text-center mb-8 ${
            isDark ? "text-white" : "text-gray-800"
          }`}>
            Entrar / Cadastrar
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className={`block text-sm font-medium text-center mb-3 ${
                isDark ? "text-purple-200" : "text-orange-700"
              }`}>
                Escolha seu avatar:
              </label>
              <div className="flex justify-center gap-4 flex-wrap">
                {Object.entries(avatarImages).map(([key, src]) => (
                  <div key={key}>
                    <input
                      type="radio"
                      name="avatar"
                      id={key}
                      value={key}
                      className="sr-only peer"
                      onChange={(e) => setSelectedAvatar(e.target.value as AvatarKey)}
                      checked={selectedAvatar === key}
                    />
                    <label
                      htmlFor={key}
                      className={`block w-20 h-20 rounded-full cursor-pointer transition-all p-1 border-2 ${
                        isDark
                          ? "border-transparent peer-checked:border-purple-400 peer-checked:ring-4 peer-checked:ring-purple-300 peer-checked:ring-opacity-50"
                          : "border-transparent peer-checked:border-orange-500 peer-checked:ring-4 peer-checked:ring-orange-200"
                      } peer-checked:scale-110`}
                    >
                      <img
                        src={src}
                        alt={key}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="username" className={`block text-sm font-medium mb-2 ${
                isDark ? "text-purple-200" : "text-orange-700"
              }`}>
                Nome de Usuário
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={`w-full px-4 py-3 rounded-lg focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-purple-900 border border-purple-600 text-white placeholder-purple-400 focus:ring-purple-500 focus:border-purple-500"
                    : "bg-orange-50 border border-orange-300 text-orange-900 placeholder-orange-500 focus:ring-orange-500 focus:border-orange-500"
                }`}
                placeholder="Ex: seu.nome"
              />
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-2 ${
                isDark ? "text-purple-200" : "text-orange-700"
              }`}>
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full px-4 py-3 rounded-lg focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-purple-900 border border-purple-600 text-white placeholder-purple-400 focus:ring-purple-500 focus:border-purple-500"
                    : "bg-orange-50 border border-orange-300 text-orange-900 placeholder-orange-500 focus:ring-orange-500 focus:border-orange-500"
                }`}
                placeholder="********"
              />
            </div>

            <button
              type="submit"
              className={`w-full font-bold py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "bg-linear-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700 shadow-lg hover:shadow-purple-500/25"
                  : "bg-linear-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-orange-500/25"
              }`}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>

      {showSuccessModal && selectedAvatar && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-colors duration-300 ${
            isDark
              ? "bg-purple-900 bg-opacity-80"
              : "bg-orange-300 bg-opacity-60"
          }`}
          onClick={handleCloseModal}
        >
          <div
            className={`p-8 rounded-2xl shadow-xl w-full max-w-sm text-center transition-colors duration-300 ${
              isDark
                ? "bg-linear-to-br from-purple-800 to-violet-800 border border-purple-600"
                : "bg-white border border-orange-200"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={`text-2xl font-bold mb-4 ${
              isDark ? "text-white" : "text-orange-800"
            }`}>
              Bem-vindo!
            </h2>
            <p className={`text-lg mb-6 ${
              isDark ? "text-purple-200" : "text-orange-700"
            }`}>
              Olá, <span className={`font-bold ${
                isDark ? "text-purple-300" : "text-orange-600"
              }`}>
                {username}
              </span>!
            </p>
            <img
              src={avatarImages[selectedAvatar]}
              alt={selectedAvatar}
              className={`w-32 h-32 rounded-full object-cover mx-auto mb-6 p-1 ${
                isDark
                  ? "ring-4 ring-purple-400"
                  : "ring-4 ring-orange-400"
              }`}
            />
            <button
              onClick={handleCloseModal}
              className={`w-full font-bold py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                isDark
                  ? "bg-linear-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700"
                  : "bg-linear-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
              }`}
            >
              Entrar no site
            </button>
          </div>
        </div>
      )}
    </section>
  );
}