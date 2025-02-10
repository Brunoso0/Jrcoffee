// components/PromotionalBanner.js
import React, { useState } from 'react';
import '../styles/PromotionalBanner.css';

function PromotionalBanner() {
  const [mainItem, setMainItem] = useState({
    image: '/img/copo de fogo.png',
    name: 'Frape Coffee',
    description: 'Uma deliciosa mistura de café gelado com creme.'
  });

  const items = [
    {
      image: '/img/copo de fogo.png',
      name: 'Frape Coffee',
      description: 'Uma deliciosa mistura de café gelado com creme.'
    },
    {
      image: '/img/sorvetin felas.png',
      name: 'Sorvetin Felas',
      description: 'Sorvete irresistível para os dias quentes.'
    },
    {
      image: '/img/capputino.png',
      name: 'Capuccino',
      description: 'Clássico capuccino com espuma cremosa.'
    },
    {
      image: '/img/cafenaxicara.png',
      name: 'Café na Xícara',
      description: 'Café quente servido na xícara perfeita.'
    },
    {
      image: '/img/suco.png',
      name: 'Suco Natural',
      description: 'Refrescantes sabores naturais para você.'
    },
    {
      image: '/img/copo.png',
      name: 'Copo Gelado',
      description: 'Bebida gelada para energizar seu dia.'
    }
  ];

  const handleThumbnailClick = (item) => {
    setMainItem(item); // Atualiza o item principal
  };

  return (
    <section className="promotional-banner">
      <div className="promo-content">
        <div className="promo-image">
          <img src={mainItem.image} alt={mainItem.name} />
        <div className="promo-text">
          <h1>{mainItem.name}</h1>
          <h4>|Descrição</h4>
          <p className="promo-description">{mainItem.description}</p>
          <button className="promo-button">Experimentar</button>
        </div>
        </div>
        <div className="promo-thumbnails">
          {items.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.name}
              className={mainItem.image === item.image ? 'selected' : ''}
              onClick={() => handleThumbnailClick(item)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PromotionalBanner;