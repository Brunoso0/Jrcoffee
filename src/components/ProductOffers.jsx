// components/ProductOffers.js
import React, { useEffect, useState } from 'react';
import '../styles/ProductOffers.css';

function ProductOffers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/produtos')
      .then((response) => response.json())
      .then((data) => setOffers(data))
      .catch((error) => console.error('Erro ao buscar ofertas:', error));
  }, []);

  
  

  const isAuthenticated = false; // Replace with actual authentication logic
  const userId = null; // Replace with actual user ID logic

  const handleRating = (produtoId, estrelas) => {
    fetch('http://localhost:3001/api/avaliacoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        produto_id: produtoId,
        usuario_id: isAuthenticated ? userId : null, // Envia null se não houver usuário autenticado
        estrelas,
        comentario: '',
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Erro ao registrar a avaliação');
      })
      .then(() => {
        fetch('http://localhost:3001/api/produtos')
          .then((response) => response.json())
          .then((data) => setOffers(data))
          .catch((error) => console.error('Erro ao atualizar produtos:', error));
      })
      .catch((error) => console.error(error.message));
  };
  
  

  return (
    <section className="product-offers">
      <h2>Nossas Delícias</h2>
      <h4>Sinta o melhor </h4>
      <div className='colored-line'>
        <img src="/img/faixagay.png" alt="faixa" />
      </div>

      <div className='container'>
        <div className="grid">
          {offers.map(offer => (
            <div key={offer.id} className="offer-item">
              <div className='offer-item-img'>
                <div className='avaliations'>
                  <img className='star' src="/icons/star.png" alt="" />
                  <p>{offer.media_avaliacoes.toFixed(1)}</p>
                </div>
                <img 
                  src={`http://localhost:3001${offer.image_path}`} 
                  alt={offer.name} 
                  onError={(e) => (e.target.src = '/img/nda.png')} // Imagem padrão em caso de erro
                />
              </div>
              <div className='offer-item-text'>
                <div className='text-star'>
                  <h3>{offer.nome}</h3>
                  <div className="rating">
                    {[5, 4, 3, 2, 1].map(star => (
                      <React.Fragment key={star}>
                        <input
                          value={star}
                          name={`rating-${offer.id}`}
                          id={`star${star}-${offer.id}`}
                          type="radio"
                          onClick={() => handleRating(offer.id, star)}
                        />
                        <label htmlFor={`star${star}-${offer.id}`}></label>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <p className='description'>{offer.descricao}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='seeMore'> 
          <button className='seeMore-button'>Ver Mais</button>
        </div>
      </div>
    </section>
  );
}

export default ProductOffers;
