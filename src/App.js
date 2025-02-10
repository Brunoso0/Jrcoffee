// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import ProductOffers from './components/ProductOffers';
import PromotionalBanner from './components/PromotionalBanner';
import PackagedProducts from './components/PackagedProducts';
import NewsSection from './components/NewsSection';
import FeedbackSection from './components/FeedbackSection';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Local from './pages/Local';

import './styles/global.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top 100%',
            end: 'top 20%',
            scrub: 0.2,
            toggleActions: 'play none none reverse',
          },
          duration: 1,
        }
      );
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      const navLinks = document.querySelectorAll('header a');
      const burgerSpans = document.querySelectorAll('.burguer-span');
      const logo = document.querySelector('.logo img'); // Seleciona a imagem da logo
  
      if (window.scrollY > 50) {
        header.style.backgroundColor = '#465847'; // Cor de fundo do header
        header.style.transition = 'background-color 0.8s';
        header.style.paddingBottom = '20px';
  
        navLinks.forEach(link => {
          link.style.color = '#ffffff'; // Links brancos
        });
  
        burgerSpans.forEach(span => {
          span.style.backgroundColor = '#ffffff'; // Barras brancas
        });
  
        if (logo) {
          logo.src = '/img/Logo-Branca.png'; // Troca para a versão escura da logo
        }
      } else {
        header.style.backgroundColor = 'transparent'; // Volta ao estado inicial do header
        navLinks.forEach(link => {
          link.style.color = '#000000'; // Links pretos
        });
  
        burgerSpans.forEach(span => {
          span.style.backgroundColor = '#000000'; // Volta a cor original das barras
        });
  
        if (logo) {
          logo.src = '/img/LOGO.png'; // Volta para a versão clara da logo
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <FeaturedProducts />
                <ProductOffers />
                <PromotionalBanner />
                <PackagedProducts />
                <NewsSection />
                <Gallery />
                <FeedbackSection />
              </>
            }
          />
          <Route path="/products" element={<section><Products /></section>} />
          <Route path="/menu" element={<section><Menu /></section>} />
          <Route path="/about-us" element={<section><AboutUs /></section>} />
          <Route path="/contact" element={<section><Contact /></section>} />
          <Route path="/local" element={<section><Local /></section>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}


export default App;
