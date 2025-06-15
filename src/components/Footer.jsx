// components/Footer.js
import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className='social-media'>
        <div className="social-media-title">
            <h2>Acompanhe-nos nas <b>Redes Sociais:</b></h2>
        </div>
        <div className='social-media-icons'>
          {/* <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <img src="/icons/facebook.png" alt="Facebook" />
          </a> */}
          <a href="https://www.instagram.com/jrcoffeeoficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer">
            <img src="/icons/instagram.png" alt="Instagram" />
          </a>
          {/* <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
            <img src="/icons/youtube.png" alt="Twitter" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
            <img src="/icons/linkedin.png" alt="Linkedin" />
          </a> */}
        </div>

      </div>
      <div className="footer-info">
        <div className="logo-footer">
          <img src="/img/Logo-footer.png" alt="" />
        </div>
        <div className="contact-info">
          <h1>Contato</h1>
          <p><img className='icons-footer' src="/icons/tel.png" alt="" />WhatsApp: (74) 9 8133-3386</p>
          <p><img className='icons-footer' src="/icons/mail.png" alt="" />Email: jrcoffee@gmail.com</p>
        </div>
        {/* <div className="quick-links">
          <h1>Contato</h1>
          <p><img className='icons-footer' src="/icons/tel.png" alt="" />Telefone 1: (xx) x xxxx-xxxx</p>
          <p><img className='icons-footer' src="/icons/tel.png" alt="" />Telefone 2: (xx) x xxxx-xxxx</p>
          <p><img className='icons-footer' src="/icons/mail.png" alt="" />Email: jrcoffee@gmail.com</p>
        </div> */}
        {/* <div className="newsletter">
          <h1>Contato</h1>
          <p><img className='icons-footer' src="/icons/tel.png" alt="" />Telefone 1: (xx) x xxxx-xxxx</p>
          <p><img className='icons-footer' src="/icons/tel.png" alt="" />Telefone 2: (xx) x xxxx-xxxx</p>
          <p><img className='icons-footer' src="/icons/mail.png" alt="" />Email: jrcoffee@gmail.com</p>
        </div> */}
      </div>
      <div className='footer-credits'>
        <p>© 2025 - JR Coffee - Todos os direitos reservados - Desenvolvido por <a href="https://www.linkedin.com/in/brunoso0" target="_blank" rel="noreferrer">Bruno Santos</a></p>
      </div>
    </footer>
  );
}

export default Footer;