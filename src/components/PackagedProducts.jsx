// components/PackagedProducts.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import '../styles/PackagedProducts.css';

function PackagedProducts() {
  const products = [
    {
      id: 1,
      name: 'Café Torrado',
      subtitle: 'Sabor Rapadura',
      image: '/img/cafe-verde.png',
    },
    {
      id: 2,
      name: 'Café Triturado',
      subtitle: 'Sabor Tradicional',
      image: '/img/cafe-azul.png',
    },
    {
      id: 3,
      name: 'Café Especial',
      subtitle: 'Sabor Intenso',
      image: '/img/cafe-laranja.png',
    },
    {
      id: 3,
      name: 'Café Especial',
      subtitle: 'Sabor Intenso',
      image: '/img/cafe-roxo.png',
    },
  ];

  return (
    <section className="packaged-products-section">
      <Swiper
        modules={[Navigation]}
        effect="coverflow"
        centeredSlides={true}
        slidesPerView={3}
        speed={1000}
        loop={true}
        navigation
        coverflowEffect={{
          rotate: 0,
          stretch: 50,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        className="swiper-container-custom"
      >
        
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="product-item-custom">
              <img src={product.image} alt={product.name} className="product-image-custom" />
              <div className='product-text'>
                <h3 className="product-name-custom">{product.name}</h3>
                <p className="product-subtitle-custom">{product.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

        <div className='qualidade'><img src="/img/qualidade.png" alt="" /></div>
        <div className='folha1'><img src="/img/folha1.png" alt="" /></div>
        <div className='folha2'><img src="/img/folha2.png" alt="" /></div>
        <div className='folha3'><img src="/img/folha3.png" alt="" /></div>
        <div className='folha4'><img src="/img/folha4.png" alt="" /></div>
    </section>
  );
}

export default PackagedProducts;
