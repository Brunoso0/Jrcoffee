import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/Menu.css'; // Certifique-se de ter o CSS atualizado

function Menu() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    Promise.all([
      api.get('/api/categorias'),
      api.get('/api/produtos'),
    ])
      .then(([resCategorias, resProdutos]) => {
        setCategorias(resCategorias.data);
        setProdutos(resProdutos.data);
      })
      .catch((err) => console.error('Erro ao carregar cardápio:', err));
  }, []);

 const produtosFiltrados = produtos.filter((produto) => {
  const texto = (produto.nome + ' ' + produto.descricao).toLowerCase();
  const textoMatch = texto.includes(search.toLowerCase());
  const categoriaMatch = category === 'all' || produto.categoria_id === Number(category);
  return textoMatch && categoriaMatch;
});


  const agrupado = {};
  categorias.forEach((cat) => {
    const lista = produtosFiltrados.filter((p) => p.categoria_id === cat.id);
    if (lista.length > 0) agrupado[cat.nome] = lista;
  });

  const semCategoria = produtosFiltrados.filter((p) => !p.categoria_id);
  if (semCategoria.length > 0) {
    agrupado['Sem Categoria'] = semCategoria;
  }

  return (
    <div className="menu-page">
      <h1>Cardápio</h1>
      <p>Explore o nosso cardápio completo.</p>

      <div className="menu-filtros">
        <div className="categoria-lista">
          <span
            className={category === "all" ? "categoria-opcao ativa" : "categoria-opcao"}
            onClick={() => setCategory("all")}
          >
            Todas as categorias
          </span>
          {categorias.map((cat) => (
            <span
              key={cat.id}
              className={category === cat.id ? "categoria-opcao ativa" : "categoria-opcao"}
              onClick={() => setCategory(cat.id)}
            >
              {cat.nome}
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {Object.keys(agrupado).length === 0 ? (
        <div>Não temos esse produto no momento.</div>
      ) : (
        Object.entries(agrupado).map(([categoria, lista]) => (
          <div key={categoria} className="categoria-bloco">
            <h2>{categoria}</h2>
            <div className="produtos-grid">
              {lista.map((produto) => (
                <div key={produto.id} className="produto-item">
                  <img
                    src={`https://api.jrcoffee.com.br:5002${produto.image_path}`}
                    alt={produto.nome}
                    onError={(e) => (e.target.src = '/img/nda.png')}
                  />
                  <h3>{produto.nome}</h3>
                  <p>{produto.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Menu;
