import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar o hook
import '../styles/Login.css';
import api from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const navigate = useNavigate(); // Instância do hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      if (isRegistering) {
        const res = await api.post('/api/auth-jrcoffee/register', { nome, email, senha });
        setMensagem('Usuário registrado com sucesso!');
        setIsRegistering(false);
      } else {
        const res = await api.post('/api/auth-jrcoffee/login', { email, senha });
        setMensagem('Login efetuado com sucesso!');

        // Exemplo: você pode salvar token ou dados se o backend retornar
        // localStorage.setItem('token', res.data.token);

        // Redirecionar para página de admin
        navigate('/admin');
      }
    } catch (err) {
      setMensagem('Erro: ' + (err.response?.data?.erro || 'Falha na requisição.'));
    }
  };

  return (
    <section className="login-page">
      <h1>{isRegistering ? 'Registrar' : 'Login'}</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        {isRegistering && (
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? 'Registrar' : 'Entrar'}</button>
      </form>

      <button
        className="toggle-button"
        onClick={() => {
          setIsRegistering(!isRegistering);
          setMensagem('');
        }}
      >
        {isRegistering ? 'Já tem conta? Faça login' : 'Não tem conta? Registre-se'}
      </button>

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </section>
  );
}

export default Login;
