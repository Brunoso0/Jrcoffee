// components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import '../styles/Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define os pontos de quebra para responsividade
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/img/LOGO.png" alt="Logo" />
        </Link>
      </div>

      {!isMobile ? (
        // Navegação para telas grandes
        <nav className="nav">
          <Link to="/" > Inicio </Link>
          <Link to="/products">Frutos de Goiás</Link>
          <Link to="/menu">Cardápio</Link>
          {/* <Link to="/About-us">Sobre nós</Link> */}
          {/* <Link to="/contact">Contato</Link> */}
          {/* <Link to="/local">Local</Link> */}
        </nav>
      ) : (
        // Navegação para telas pequenas
        <div className="mobile-menu">
          <button className="menu-toggle" onClick={handleMenuToggle}>
            <div className={`burger ${isMenuOpen ? 'open' : ''}`}>
              <span className='burguer-span'></span>
              <span className='burguer-span'></span>
              <span className='burguer-span'></span>
            </div>
          </button>
          {isMenuOpen && (
            <nav className="mobile-nav">
              <Link to="/" onClick={handleMenuToggle}>Inicio</Link>
              <Link to="/products" onClick={handleMenuToggle}>Frutos de Goiás</Link>
              <Link to="/menu" onClick={handleMenuToggle}>Nosso Cardápio</Link>
              {/* <Link to="/About-us" onClick={handleMenuToggle}>Sobre nós</Link> */}
              {/* <Link to="/contact" onClick={handleMenuToggle}>Contato</Link> */}
              {/* <Link to="/local" onClick={handleMenuToggle}>Local</Link> */}
            </nav>
          )}
        </div>
      )}

      {/* <div className="search-login">
        <div className="container-header">
          <input defaultChecked className="checkbox" type="checkbox" />
          <div className="mainbox">
            <div className="iconContainer">
              <img src="/icons/Lupa.png" alt="Search Icon" className="search_icon" />
            </div>
            <input
              className="search_input"
              placeholder="Buscar Produtos"
              type="text"
            />
          </div>
        </div>
      </div> */}
    </header>
  );
}

export default Header;
