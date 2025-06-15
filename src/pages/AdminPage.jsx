import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/Admin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Admin() {
  const [produtos, setProdutos] = useState([]);
  const [frutos, setFrutos] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    api.get('/api/produtos').then(res => setProdutos(res.data));
    api.get('/api/produtos/frutos-goias').then(res => setFrutos(res.data));
  };

  const handleChange = (e, id, tipo, campo) => {
    const setter = tipo === 'produto' ? setProdutos : setFrutos;
    const lista = tipo === 'produto' ? [...produtos] : [...frutos];
    const index = lista.findIndex(p => p.id === id);
    if (index === -1) return;
    lista[index][campo] = e.target.value;
    setter(lista);
};


  const handleImagem = (e, id, tipo) => {
    const formData = new FormData();
    formData.append('imagem', e.target.files[0]);
    const rota = tipo === 'produto'
        ? `/api/produtos/${id}/imagem`
        : `/api/produtos/frutos-goias/${id}/imagem`; // ✅ Correto conforme sua rota


    api.put(rota, formData)
      .then(() => {
        toast.success('Imagem atualizada!');
        carregarDados();
      })
      .catch(() => toast.error('Erro ao atualizar imagem.'));
  };

  const salvarAlteracoes = (item, tipo) => {
    const rota = tipo === 'produto'
      ? `/api/produtos/${item.id}`
      : `/api/produtos/frutos-goias/${item.id}`;

    api.put(rota, item)
      .then(() => {
        toast.success('Produto atualizado!');
        carregarDados();
      })
      .catch(() => toast.error('Erro ao atualizar produto.'));
  };

  const excluirItem = (id, tipo) => {
    const rota = tipo === 'produto'
      ? `/api/produtos/${id}`
      : `/api/produtos/frutos-goias/${id}`;

    api.delete(rota)
      .then(() => {
        toast.info('Produto removido.');
        carregarDados();
      })
      .catch(() => toast.error('Erro ao remover produto.'));
  };

  // Função utilitária para pegar o caminho da imagem
  function getImageUrl(item) {
    const path = item.image_path || item.imagem;
    return path ? `https://api.jrcoffee.com.br:5002${path}` : '/img/nda.png';
  }

  const renderLista = (lista, tipo) => (
  <div className="admin-bloco">
    <h2>{tipo === 'produto' ? 'Produtos' : 'Frutos do Goiás'}</h2>
    <div className="admin-grid">
      {lista.map(item => (
        <div key={item.id} className="admin-card">
          <img src={getImageUrl(item)} alt={item.nome} />
{/* force */}
          <input
            type="text"
            value={item.nome}
            onChange={(e) => handleChange(e, item.id, tipo, 'nome')}
          />
          <textarea
            value={item.descricao}
            onChange={(e) => handleChange(e, item.id, tipo, 'descricao')}
          />
          
          {/* Campo de preço só para produtos comuns */}
          {tipo === 'produto' && (
            <input
              type="number"
              value={item.preco}
              onChange={(e) => handleChange(e, item.id, tipo, 'preco')}
            />
          )}

          <input
            type="file"
            onChange={(e) => handleImagem(e, item.id, tipo)}
          />
          <div className="admin-botoes">
            <button onClick={() => salvarAlteracoes(item, tipo)}>Salvar</button>
            <button onClick={() => excluirItem(item.id, tipo)}>Excluir</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);


  return (
    <div className="admin-painel">
      <ToastContainer position="top-center" autoClose={3000} style={{zIndex: 999}}/>
      <h1>Painel de Administração</h1>
      {renderLista(produtos, 'produto')}
      {renderLista(frutos, 'fruto')}
    </div>
  );
}

export default Admin;
