// components/Hero.js
import React from 'react';
import '../styles/Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-image">
        <img src="/img/image1.png" alt="Produto em Destaque" />
      </div>
      <div className="hero-content">
        <h1>O Café</h1>
        <h4>que encantam o sentidos</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed </p>
        <button className="hero-button">Saiba Mais</button>
      </div>
    </section>
  );
}

export default Hero;