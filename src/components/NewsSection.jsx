import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import '../styles/NewsSection.css';

function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const news = [
    { id: 1, image: '/img/banner-biscoito.png' },
    { id: 2, image: '/img/banner-biscoito.png' },
    { id: 3, image: '/img/banner-biscoito.png' },
  ];

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // Troca automática dos slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 5000); // Alterar a cada 5 segundos

    return () => clearInterval(interval);
  }, [news.length]);

  // Manipula a troca de slides
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleDrag = (direction) => {
    setCurrentIndex((prevIndex) => {
      if (direction === 'left') {
        return (prevIndex + 1) % news.length;
      } else {
        return prevIndex === 0 ? news.length - 1 : prevIndex - 1;
      }
    });
  };

  let startX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      handleDrag('left');
    } else if (endX - startX > 50) {
      handleDrag('right');
    }
  };

  return (
    <section className="news-section">
      <h2>Explore os lançamentos exclusivos</h2>
      <p>e as delícias que preparamos para você!</p>
      <div
        className="carousel-promo"
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
      >
        <div className="news-item">
          <img src={news[currentIndex].image} alt={news[currentIndex].title} />
          <p>{news[currentIndex].title}</p>
        </div>
        <div className="dots">
          {news.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
