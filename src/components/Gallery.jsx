import React from 'react';
import '../styles/Galleryy.css';

const Gallery = () => {
    return (
        <section>
            <div className='gallery-banner'>
                <div className='gallery-banner-text'>
                    <h4>- Viva essa experiência -</h4>
                    <h1>TITULO PARA EMPRESA</h1>
                    <button className='gallery-button'>Conhecer</button>
                </div>
                <div className='gallery-banner-img'>
                    <img src="/img/velho.png" alt="" />
                </div>
            </div>
            <div className="gallery">
                <img src="/img/gallery.png" alt="Gallery 1" />
                <img src="/img/gallery.png" alt="Gallery 2" />
                <img src="/img/gallery.png" alt="Gallery 3" />
                <img src="/img/gallery.png" alt="Gallery 4" />
                <img src="/img/gallery.png" alt="Gallery 5" />
                <img src="/img/gallery.png" alt="Gallery 6" />
                <img src="/img/gallery.png" alt="Gallery 7" />
                <img src="/img/gallery.png" alt="Gallery 8" />
            </div>
            <div className='gallery-button2'>
                <button><img src="/icons/icon-insta.png" alt="" />Ver Mais</button>
                </div>
        </section>
    );
};

export default Gallery;