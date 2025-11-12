import React, { useState } from 'react';

const avatarImages = {
  "Gato Rajado": "/img/gatorajado.png", 
  "Gato Branco": "/img/gatobranco.png",
  "Gato Branco Sapo": "/img/gatobrancosapo.png",
  "Gato Rajado Sapo": "/img/gatosapo.png"
};

function Home() {
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    if (!selectedAvatar) {
      alert('Por favor, escolha um avatar!');
      return;
    }

    console.log('Conta criada:', {
      avatar: selectedAvatar,
      username,
      password,
    });
    
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    
    setSelectedAvatar('');
    setUsername('');
    setPassword('');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-orange-200 rounded-2xl px-6 py-12 md:py-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        <div className="space-y-6">
          <h1 className="sm:text-[2.75rem] text-[3rem] font-extrabold text-orange-800 leading-tight">
            Bem-vindo ao <span className="text-orange-400">PausaProGato</span>
          </h1>
          <p className="text-[1.125rem] text-orange-700 leading-relaxed">
            O <span className="font-semibold">PausaProGato</span> é um site criado para
            monitorar o humor do usuário, oferecendo um ambiente leve, 
            acolhedor e focado em bem-estar.
          </p>
        </div>

        <div className="bg-orange-50 p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Crie sua conta
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Escolha seu avatar:
              </label>
              <div className="flex justify-center gap-6">
                <div>
                  <input 
                    type="radio" 
                    name="avatar" 
                    id="gato-rajado" 
                    value="Gato Rajado" 
                    className="sr-only peer" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedAvatar(e.target.value)}
                    checked={selectedAvatar === 'Gato Rajado'}
                  />
                  <label 
                    htmlFor="gato-rajado" 
                    className="block w-20 h-20 md:w-24 md:h-24 rounded-full cursor-pointer transition-all p-1 border-2 border-transparent peer-checked:border-orange-500 peer-checked:scale-110"
                  >
                    <img 
                      src={avatarImages["Gato Rajado"]} 
                      alt="Gato Rajado" 
                      className="w-full h-full rounded-full object-cover" 
                    />
                  </label>
                </div>
                <div>
                  <input 
                    type="radio" 
                    name="avatar" 
                    id="gato-branco" 
                    value="Gato Branco" 
                    className="sr-only peer"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedAvatar(e.target.value)}
                    checked={selectedAvatar === 'Gato Branco'}
                  />
                  <label 
                    htmlFor="gato-branco" 
                    className="block w-20 h-20 md:w-24 md:h-24 rounded-full cursor-pointer transition-all p-1 border-2 border-transparent peer-checked:border-orange-500 peer-checked:scale-110"
                  >
                    <img 
                      src={avatarImages["Gato Branco"]} 
                      alt="Gato Branco" 
                      className="w-full h-full rounded-full object-cover" 
                    />
                  </label>
                </div>
                <div>
                  <input 
                    type="radio" 
                    name="avatar" 
                    id="gato-branco-sapo" 
                    value="Gato Branco Sapo" 
                    className="sr-only peer"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedAvatar(e.target.value)}
                    checked={selectedAvatar === 'Gato Branco Sapo'}
                  />
                  <label 
                    htmlFor="gato-branco-sapo" 
                    className="block w-20 h-20 md:w-24 md:h-24 rounded-full cursor-pointer transition-all p-1 border-2 border-transparent peer-checked:border-orange-500 peer-checked:scale-110"
                  >
                    <img 
                      src={avatarImages["Gato Branco Sapo"]} 
                      alt="Gato Branco Sapo" 
                      className="w-full h-full rounded-full object-cover" 
                    />
                  </label>
                </div><div>
                  <input 
                    type="radio" 
                    name="avatar" 
                    id="gato-rajado-sapo" 
                    value="Gato Rajado Sapo" 
                    className="sr-only peer"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedAvatar(e.target.value)}
                    checked={selectedAvatar === 'Gato Rajado Sapo'}
                  />
                  <label 
                    htmlFor="gato-rajado-sapo" 
                    className="block w-20 h-20 md:w-24 md:h-24 rounded-full cursor-pointer transition-all p-1 border-2 border-transparent peer-checked:border-orange-500 peer-checked:scale-110"
                  >
                    <img 
                      src={avatarImages["Gato Rajado Sapo"]} 
                      alt="Gato Rajado Sapo" 
                      className="w-full h-full rounded-full object-cover" 
                    />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-orange-700 mb-2">
                Nome de Usuário
              </label>
              <input 
                type="text" 
                id="username" 
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-orange-50 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                placeholder="Ex: seu.nome"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-orange-700 mb-2">
                Senha
              </label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-orange-50 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                placeholder="********"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-300 shadow-md"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>

      {showSuccessModal && (
        <div 
          className="fixed inset-0 bg-orange-300 bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal} 
        >
          <div 
            className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center transform transition-all scale-100 opacity-100"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} 
          >
            
            <h2 className="text-2xl font-bold text-orange-800 mb-4">
              Cadastro Realizado!
            </h2>
            
            <p className="text-lg text-orange-700 mb-6">
              Bem-vindo, <span className="font-bold text-orange-600">{username}</span>!
            </p>

            <img 
              src={avatarImages[selectedAvatar]} 
              alt={selectedAvatar}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-6 ring-4 ring-orange-400 p-1"
            />
            
            <button 
              onClick={handleCloseModal}
              className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-300 shadow-md"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

    </section>
  );
}

export default Home;