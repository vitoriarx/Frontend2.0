// pages/recover-password.tsx ou components/PasswordRecoveryPage.tsx
"use client"; // Marca este componente como um Client Component

import React, { useState } from 'react';

// Componente principal da página de recuperação de senha
const PasswordRecoveryPage: React.FC = () => {
  // Estados para armazenar os valores dos campos de email e usuário
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>(''); // Novo estado para o nome de usuário
  // Estado para exibir mensagens de feedback (sucesso/erro)
  const [message, setMessage] = useState<string>('');
  // Estado para indicar se o formulário está sendo submetido
  const [loading, setLoading] = useState<boolean>(false);

  // Função para lidar com a submissão do formulário de recuperação de senha
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Previne o recarregamento da página

    setMessage(''); // Limpa mensagens anteriores
    setLoading(true); // Ativa o estado de carregamento

    try {
      // Simula uma chamada de API para recuperação de senha
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simula atraso de rede

      // Lógica de simulação: em um aplicativo real, você enviaria um email de recuperação
      // Agora verifica tanto o email quanto o nome de usuário
      if (email.includes('@') && email.includes('.') && username.trim() !== '') {
        setMessage('Se um email e usuário associados forem encontrados, um link de recuperação de senha será enviado para sua caixa de entrada.');
      } else {
        setMessage('Por favor, insira um endereço de email e um nome de usuário válidos.');
      }
    } catch (err) {
      console.error('Erro durante a recuperação de senha:', err);
      setMessage('Ocorreu um erro ao tentar recuperar a senha. Tente novamente.');
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    // Container principal: centraliza o formulário na tela com um fundo azul claro
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4 sm:p-6 lg:p-8 font-sans">
      {/* Cartão do formulário de recuperação de senha: estilo com sombra e bordas arredondadas */}
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Recuperar Senha
        </h2>

        {/* Exibe mensagem de feedback (sucesso/erro) */}
        {message && (
          <div
            className={`px-4 py-3 rounded-md relative mb-6 ${
              message.includes('válidos') || message.includes('erro')
                ? 'bg-red-100 border border-red-400 text-red-700'
                : 'bg-green-100 border border-green-400 text-green-700'
            }`}
            role="alert"
          >
            <span className="block sm:inline">{message}</span>
          </div>
        )}

        {/* Formulário de recuperação de senha */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Endereço de Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-base"
              placeholder="seu.email@exemplo.com"
            />
          </div>

          {/* Novo Campo de Usuário */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Nome de Usuário
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-base"
              placeholder="seu_nome_de_usuario"
            />
          </div>

          {/* Botão de Recuperação de Senha */}
          <div>
            <button
              type="submit"
              disabled={loading} // Desabilita o botão enquanto carrega
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out
                ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
            </button>
          </div>
        </form>

        {/* Link para voltar à página de login */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Lembrou da sua senha?{' '}
            <a href="/app" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
              Voltar para o Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;
