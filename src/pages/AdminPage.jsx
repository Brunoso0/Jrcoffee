import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/Admin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Admin() {
  const [produtos, setProdutos] = useState([]);
  const [frutos, setFrutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    descricao: '',
    preco: '',
    categoria_id: '',
  });
  const [imagemProduto, setImagemProduto] = useState(null);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    carregarCategorias();
    carregarDados();
  }, []);

  const carregarCategorias = () => {
    api.get('/api/categorias')
      .then(res => setCategorias(res.data))
      .catch(() => setMensagem('Erro ao carregar categorias.'));
  };

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
          <label className="admin-disponivel">
            <input
              type="checkbox"
              checked={item.disponivel === 1}
              onChange={e =>
                handleChange(
                  { target: { value: e.target.checked ? 1 : 0 } },
                  item.id,
                  tipo,
                  'disponivel'
                )
              }
            />
            Disponível
          </label>

        </div>
      ))}
    </div>
  </div>
);


  const handleCriarCategoria = (e) => {
    e.preventDefault();
    api.post('/api/categorias', { nome: novaCategoria })
      .then(() => {
        setMensagem('Categoria criada!');
        setNovaCategoria('');
        carregarCategorias();
      })
      .catch(() => setMensagem('Erro ao criar categoria.'));
  };

  const atualizarNovoProduto = (campo, valor) => {
    setNovoProduto(prev => ({ ...prev, [campo]: valor }));
  };

  const handleCriarProduto = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nome', novoProduto.nome);
    formData.append('descricao', novoProduto.descricao);
    formData.append('preco', novoProduto.preco);
    formData.append('categoria_id', novoProduto.categoria_id);
    if (imagemProduto) formData.append('imagem', imagemProduto);

    api.post('/api/produtos', formData)
      .then(() => {
        setMensagem('Produto criado!');
        setNovoProduto({ nome: '', descricao: '', preco: '', categoria_id: '' });
        setImagemProduto(null);
        carregarDados();
      })
      .catch(() => setMensagem('Erro ao criar produto.'));
  };

  return (
    <div className="admin-painel">
      <ToastContainer position="top-center" autoClose={3000} style={{zIndex: 999}}/>
      <h1>Painel de Administração</h1>

      {/* FORMULÁRIO NO TOPO */}
      <div className="admin-formulario">
        {mensagem && <div className="admin-mensagem">{mensagem}</div>}

        <h2>Criar Nova Categoria</h2>
        <form onSubmit={handleCriarCategoria}>
          <input
            type="text"
            placeholder="Nome da categoria"
            value={novaCategoria}
            onChange={(e) => setNovaCategoria(e.target.value)}
          />
          <button type="submit">Adicionar Categoria</button>
        </form>

        <h2>Criar Novo Produto</h2>
        <form onSubmit={handleCriarProduto} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Nome do produto"
            value={novoProduto.nome}
            onChange={(e) => atualizarNovoProduto('nome', e.target.value)}
            required
          />
          <textarea
            placeholder="Descrição"
            value={novoProduto.descricao}
            onChange={(e) => atualizarNovoProduto('descricao', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Preço"
            value={novoProduto.preco}
            onChange={(e) => atualizarNovoProduto('preco', e.target.value)}
          />
          <select
            value={novoProduto.categoria_id}
            onChange={(e) => atualizarNovoProduto('categoria_id', e.target.value)}
            required
          >
            <option value="">Selecione a categoria</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
          <input type="file" onChange={(e) => setImagemProduto(e.target.files[0])} />
          <button type="submit">Criar Produto</button>
        </form>
      </div>

      {/* LISTAS DE ITENS ABAIXO */}
      <div className="admin-listas">
        {renderLista(produtos, 'produto')}
        {renderLista(frutos, 'fruto')}
      </div>
    </div>
  );
}

export default Admin;
