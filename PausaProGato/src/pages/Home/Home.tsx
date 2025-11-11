import React, { useState } from 'react';

// Objeto para mapear o nome do avatar à sua URL de imagem
// AS URLS FORAM ATUALIZADAS AQUI PARA APONTAR PARA SEUS ARQUIVOS .PNG
const avatarImages = {
  "Gato Preto": "/images/gato-preto.png", // CORRIGIDO: de "imagens" para "images" (com i)
  "Gato Branco": "/images/gato-branco.png" // CORRIGIDO: de "imagens" para "images" (com i)
};

function Home() {
  // Estados para controlar os campos do formulário
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // NOVO ESTADO: Controla a visibilidade do modal de sucesso
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Função para simular o envio do formulário
  // TIPO ADICIONADO: 'event' agora tem o tipo 'React.FormEvent<HTMLFormElement>'
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Impede o recarregamento da página

    // Validação simples
    if (!selectedAvatar) {
      // Você pode substituir este alerta por uma mensagem de erro mais elegante
      alert('Por favor, escolha um avatar!');
      return;
    }

    // Simula o envio dos dados
    console.log('Formulário enviado:', {
      avatar: selectedAvatar,
      username,
      password,
    });
    
    // Ativamos o modal
    setShowSuccessModal(true);
    // Não limpamos o formulário ainda, pois o modal precisa dos dados
  };

  // NOVA FUNÇÃO: Chamada quando o modal é fechado
  const handleCloseModal = () => {
    // Esconde o modal
    setShowSuccessModal(false);
    
    // Agora sim, limpa o formulário (opcional)
    setSelectedAvatar('');
    setUsername('');
    setPassword('');
  };

  return (
    // 'relative' é importante para o 'z-index' do modal funcionar bem
    <section className="relative min-h-screen flex items-center justify-center bg-orange-200 rounded-2xl px-6 py-12 md:py-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        {/* LADO ESQUERDO: Texto explicativo */}
        <div className="space-y-6">
          <h1 className="sm:text-[2.75rem] text-[3rem] font-extrabold text-orange-800 leading-tight">
            Bem-vindo ao <span className="text-orange-400">PausaProGato</span>
          </h1>
          <p className="text-[1.125rem] text-orange-700 leading-relaxed">
            O <span className="font-semibold">PausaProGato</span> é um site criado para
            monitorar o humor do usuário, oferecendo um ambiente leve, 
            acolhedor e focado em bem-estar.
          </p>
          <p className="text-[1.125rem] text-orange-700 leading-relaxed">
            Tudo pensado para tornar sua experiência fácil, segura e eficiente.
          </p>
        </div>

        {/* LADO DIREITO: Formulário de Cadastro */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Crie sua conta
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Seleção de Avatar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Escolha seu avatar:
              </label>
              <div className="flex justify-center gap-6">
                {/* Gato Preto */}
                <div>
                  <input 
                    type="radio" 
                    name="avatar" 
                    id="gato-preto" 
                    value="Gato Preto" 
                    className="sr-only peer" // "sr-only" esconde o rádio real
                    // TIPO ADICIONADO: 'e' agora tem o tipo 'React.ChangeEvent<HTMLInputElement>'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedAvatar(e.target.value)}
                    checked={selectedAvatar === 'Gato Preto'}
                  />
                  <label 
                    htmlFor="gato-preto" 
                    className="block w-20 h-20 md:w-24 md:h-24 rounded-full cursor-pointer transition-all p-1 border-2 border-transparent peer-checked:border-orange-500 peer-checked:scale-110"
                  >
                    <img 
                      src={avatarImages["Gato Preto"]} 
                      alt="Gato Preto" 
                      className="w-full h-full rounded-full object-cover" 
                      // Fallback caso a imagem não carregue
                    />
                  </label>
                </div>
                {/* Gato Branco */}
                <div>
                  <input 
                    type="radio" 
                    name="avatar" 
                    id="gato-branco" 
                    value="Gato Branco" 
                    className="sr-only peer"
                    // TIPO ADICIONADO: 'e' agora tem o tipo 'React.ChangeEvent<HTMLInputElement>'
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
                      // Fallback caso a imagem não carregue
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Nome de Usuário */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Nome de Usuário
              </label>
              <input 
                type="text" 
                id="username" 
                value={username}
                // TIPO ADICIONADO: 'e' agora tem o tipo 'React.ChangeEvent<HTMLInputElement>'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                placeholder="Ex: seu.nome"
              />
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input 
                type="password" 
                id="password" 
                value={password}
                // TIPO ADICIONADO: 'e' agora tem o tipo 'React.ChangeEvent<HTMLInputElement>'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                placeholder="********"
              />
            </div>

            {/* Botão de Cadastro */}
            <button 
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-300 shadow-md"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>

      {/* === Modal de Sucesso === */}
      {/* Renderiza o modal condicionalmente */}
      {showSuccessModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          // Clicar no fundo também fecha o modal
          onClick={handleCloseModal} 
        >
          <div 
            className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center transform transition-all scale-100 opacity-100"
            // Impede que clicar dentro do card feche o modal
            // TIPO ADICIONADO: 'e' agora tem o tipo 'React.MouseEvent<HTMLDivElement>'
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} 
          >
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Cadastro Realizado!
            </h2>
            
            <p className="text-lg text-gray-700 mb-6">
              Bem-vindo, <span className="font-bold text-orange-600">{username}</span>!
            </p>

            {/* Exibe a imagem do avatar selecionado */}
            <img 
              src={avatarImages[selectedAvatar]} 
              alt={selectedAvatar}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-6 ring-4 ring-orange-400 p-1"
              // Fallback caso a imagem não carregue
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
      {/* === Fim do Modal === */}

    </section>
  );
}

export default Home;