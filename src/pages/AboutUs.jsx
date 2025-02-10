import React, { useRef } from 'react';
import '../styles/AboutUs.css';

function AboutUs() {
  const textContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (textContainerRef.current) {
      const scrollAmount = 100; // Distância do scroll
      if (direction === 'down') {
        textContainerRef.current.scrollBy({
          top: scrollAmount,
          behavior: 'smooth',
        });
      } else if (direction === 'up') {
        textContainerRef.current.scrollBy({
          top: -scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div className="about-us">
      <div className="about-banner">
        <img src="/img/cinza.png" alt="Banner" />
      </div>
      <section className="section-intro">
        <div className="text-container">
          <h1 className="title">Jr Coffee</h1>
          <div className="description-wrapper">
            <div className="description-about" ref={textContainerRef}>
              <p>
                A JR Coffee é uma empresa apaixonada por café, que nasceu com o objetivo de levar
                uma experiência única e de alta qualidade para todos os amantes dessa bebida icônica.
                Combinamos tradição e inovação para oferecer cafés que encantam pelo sabor, aroma e personalidade.
                Cada grão que chega até você foi cuidadosamente selecionado e preparado, garantindo uma experiência de degustação inesquecível.
                Desde a nossa fundação, buscamos não só servir café de excelência, mas também criar uma cultura
                de conexão, acolhimento e prazer. Seja no nosso cardápio diversificado ou nas nossas opções
                de grãos frescos para o preparo em casa, a JR Coffee se dedica a transformar cada xícara em um momento especial.
              </p>
            </div>
            <div className="scroll-buttons">
              <button className="scroll-up" onClick={() => handleScroll('up')}>
                <img src="/icons/up.png" alt="Scroll Up" />
              </button>
              <button className="scroll-down" onClick={() => handleScroll('down')}>
                <img src="/icons/down.png" alt="Scroll Down" />
              </button>
            </div>
          </div>
        </div>
        <div className="media-container">
          <img src="/img/cafe1.png" alt="Café 1" className="image-large" />
          <img src="/img/cafe2.png" alt="Café 2" className="image-small" />
        </div>
      </section>
      <section className="section-team">
        <div className="team-banner">
          <img src="/img/team-banner.png" alt="Equipe Jr Coffee" />
        </div>
        <div className='team-content'>
          <h2>A Força por Trás <br />do Nosso Sucesso!</h2>
          <p>Conheça quem faz nossas delícias</p>
        </div>
      </section>
      <section className="section-history">
          <div className="history-content">
        <div className="history-container">
          <div className="history-banner">
            <img src="/img/history-banner.png" alt="História Jr Coffee" />
          </div>
            <h2>Conheça o Surgimento</h2>
            <div className="description-wrapper-history">
              <div className="description-about-history" ref={textContainerRef}>
                <p>
                  A JR Coffee é uma empresa apaixonada por café, que nasceu com o objetivo de levar
                  uma experiência única e de alta qualidade para todos os amantes dessa bebida icônica.
                  Combinamos tradição e inovação para oferecer cafés que encantam pelo sabor, aroma e personalidade.
                  Cada grão que chega até você foi cuidadosamente selecionado e preparado, garantindo uma experiência
                  de degustação inesquecível. Desde a nossa fundação, buscamos não só servir café de excelência,
                  mas também criar uma cultura de conexão, acolhimento e prazer. Seja no nosso cardápio diversificado
                  ou nas nossas opções de grãos frescos para o preparo em casa, a JR Coffee se dedica a transformar
                  cada xícara em um momento especial.
                </p>
              </div>
              <div className="scroll-buttons-history">
                <button className="scroll-up" onClick={() => handleScroll('up')}>
                  <img src="/icons/up.png" alt="Scroll Up" />
                </button>
                <button className="scroll-down" onClick={() => handleScroll('down')}>
                  <img src="/icons/down.png" alt="Scroll Down" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default AboutUs;
