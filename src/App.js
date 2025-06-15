// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ToastContainer } from 'react-toastify'; // IMPORTADO
import 'react-toastify/dist/ReactToastify.css'; // CSS DO TOASTIFY

import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProductOffers from './components/ProductOffers';
import FrutosGoias from './components/FrutosGoias';
import Gallery from './components/Gallery';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Local from './pages/Local';
import Login from './pages/Login';
import AdminPage from './pages/AdminPage';

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
      const logo = document.querySelector('.logo img');

      if (window.scrollY > 50) {
        header.style.backgroundColor = '#465847';
        header.style.transition = 'background-color 0.8s';
        header.style.paddingBottom = '20px';
        navLinks.forEach(link => link.style.color = '#ffffff');
        burgerSpans.forEach(span => span.style.backgroundColor = '#ffffff');
        if (logo) logo.src = '/img/Logo-Branca.png';
      } else {
        header.style.backgroundColor = 'transparent';
        navLinks.forEach(link => link.style.color = '#000000');
        burgerSpans.forEach(span => span.style.backgroundColor = '#000000');
        if (logo) logo.src = '/img/LOGO.png';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
                <ProductOffers />
                <FrutosGoias />
                <Gallery />
              </>
            }
          />
          <Route path="/products" element={<section><Products /></section>} />
          <Route path="/menu" element={<section><Menu /></section>} />
          <Route path="/about-us" element={<section><AboutUs /></section>} />
          <Route path="/contact" element={<section><Contact /></section>} />
          <Route path="/local" element={<section><Local /></section>} />
          <Route path="/login" element={<section><Login /></section>} />
          <Route path="/admin" element={<section><AdminPage /></section>} />
        </Routes>
      </main>
      <div style={{ paddingTop: '32px' }}>
        <Footer />
      </div>

      {/* Toastify container no topo da hierarquia visual */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 99999 }}
      />
    </Router>
  );
}

export default App;
