import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import '../styles/FeaturedProducts.css';

function FeaturedProducts() {
  const [categories, setCategories] = useState([]);

  // Verificar tamanhos de tela para responsividade
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 769px) and (max-width: 1024px)' });

  useEffect(() => {
    fetch('http://localhost:3001/api/categorias')
      .then((response) => response.json())
      .then((data) => {
        console.log('Categorias recebidas:', data);
        setCategories(data);
      })
      .catch((error) => console.error('Erro ao buscar categorias:', error));
  }, []);

  return (
    <section className="featured-products">
      <h2>Categorias em Destaque</h2>
      <div className={`carousel ${isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}`}>
        {categories.map((category) => (
          <div key={category.id} className="product-item">
            <img
              src={`http://localhost:3001${category.image_path}`}
              onError={(e) => {
                console.error('Erro ao carregar a imagem:', category.image_path);
                e.target.src = '/img/placeholder.png';
              }}
              alt={category.nome}
            />
            <p>{category.nome}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
