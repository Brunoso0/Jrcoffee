import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductOffers.css';
import api from '../services/api.js';

function FrutosGoias() {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/produtos/frutos-goias')
      .then((res) => {
        const topRated = res.data
          .sort((a, b) => Number(b.media_avaliacoes || 0) - Number(a.media_avaliacoes || 0))
          .slice(0, 9);
        setOffers(topRated);
      })
      .catch((err) => console.error('Erro ao buscar produtos Frutos Goiás:', err));
  }, []);

  const isAuthenticated = false;
  const userId = null;

  const handleRating = (produtoId, estrelas) => {
    api.post('/api/avaliacoes', {
      produto_id: produtoId,
      usuario_id: isAuthenticated ? userId : null,
      estrelas,
      comentario: '',
    })
      .then(() => api.get('/api/produtos/frutos-goias'))
      .then((res) => {
        const topRated = res.data
          .sort((a, b) => Number(b.media_avaliacoes || 0) - Number(a.media_avaliacoes || 0))
          .slice(0, 9);
        setOffers(topRated);
      })
      .catch((err) => console.error('Erro ao registrar avaliação:', err));
  };

  return (
    <section className="product-offers">
      <h2>Frutos Goiás</h2>
      <h4>Os melhores sorvetes e picolés</h4>
      <div className="colored-line">
        <img src="/img/faixagay.png" alt="faixa" />
      </div>

      <div className="container">
        <div className="grid">
          {offers.map((offer) => (
            <div key={offer.id} className="offer-item">
              <div className="offer-item-img">
                <div className="avaliations">
                  <img className="star" src="/icons/star.png" alt="estrela" />
                  <p>{Number(offer.media_avaliacoes || 0).toFixed(1)}</p>
                </div>
                <img
                  src={`https://api.jrcoffee.com.br:5002${offer.image_path}`}
                  alt={offer.nome}
                  onError={(e) => { e.target.src = '/img/nda.png'; }}
                />
              </div>
              <div className="offer-item-text">
                <div className="text-star">
                  <h3>{offer.nome}</h3>
                  <div className="rating">
                    {[5, 4, 3, 2, 1].map((star) => (
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
                <p className="description">{offer.descricao}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="seeMore">
          <button className="seeMore-button" onClick={() => navigate('/products')}>
            Ver Mais
          </button>
        </div>
      </div>
    </section>
  );
}

export default FrutosGoias;
