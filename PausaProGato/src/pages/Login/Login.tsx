import { useState } from "react";
import { useNavigate } from "react-router-dom";

type AvatarKey = "Gato Rajado" | "Gato Branco" | "Gato Branco Sapo" | "Gato Rajado Sapo";

const avatarImages: Record<AvatarKey, string> = {
  "Gato Rajado": "/img/gatorajado.png",
  "Gato Branco": "/img/gatobranco.png",
  "Gato Branco Sapo": "/img/gatobrancosapo.png",
  "Gato Rajado Sapo": "/img/gatosapo.png",
};

export default function LoginPage() {
  const navigate = useNavigate();

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

    localStorage.setItem("usuario", JSON.stringify({ username, avatar: selectedAvatar }));

    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/home"); 
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-orange-200 px-6 py-12">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        <div className="space-y-6">
          <h1 className="sm:text-[2.75rem] text-[3rem] font-extrabold text-orange-800 leading-tight">
            Bem-vindo ao <span className="text-orange-400">PausaProGato</span>
          </h1>
          <p className="text-[1.125rem] text-orange-700 leading-relaxed">
            O <span className="font-semibold">PausaProGato</span> é um site criado para
            monitorar o humor do usuário, oferecendo um ambiente leve, acolhedor e focado em bem-estar.
          </p>
        </div>

        <div className="bg-orange-50 p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Entrar / Cadastrar</h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
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
                      className="block w-20 h-20 rounded-full cursor-pointer transition-all p-1 border-2 border-transparent peer-checked:border-orange-500 peer-checked:scale-110"
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

            {/* Nome */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-orange-700 mb-2">
                Nome de Usuário
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-orange-50 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Ex: seu.nome"
              />
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-orange-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-orange-50 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="********"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-all duration-300"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>

      {showSuccessModal && selectedAvatar && (
        <div
          className="fixed inset-0 bg-orange-300 bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-orange-800 mb-4">Bem-vindo!</h2>
            <p className="text-lg text-orange-700 mb-6">
              Olá, <span className="font-bold text-orange-600">{username}</span>!
            </p>
            <img
              src={avatarImages[selectedAvatar]}
              alt={selectedAvatar}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-6 ring-4 ring-orange-400 p-1"
            />
            <button
              onClick={handleCloseModal}
              className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-all"
            >
              Entrar no site
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
