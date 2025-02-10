// components/FeedbackSection.js
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { InputTextarea } from 'primereact/inputtextarea';
        
import '../styles/FeedbackSection.css';

function FeedbackSection() {
  const testimonials = [
    { id: 1, text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', image: '/img/copo-perfiil.png', name: 'Cliente 1', rating: 5 },
    { id: 2, text: 'Adorei o produto!', image: '/img/copo-perfiil.png', name: 'Cliente 2', rating: 4 },
    { id: 3, text: 'Café incrível, recomendo!', image: '/img/copo-perfiil.png', name: 'Cliente 3', rating: 5 },
    { id: 4, text: 'Ambiente aconchegante.', image: '/img/copo-perfiil.png', name: 'Cliente 4', rating: 4 },
    { id: 5, text: 'Sempre compro aqui!', image: '/img/copo-perfiil.png', name: 'Cliente 5', rating: 3 },
  ];

  const [feedbackText, setFeedbackText] = useState('');
  const maxLength = 50;

  const renderStars = (rating) => {
    return Array(rating)
      .fill()
      .map((_, index) => (
        <span key={index} className="star">
          ★
        </span>
      ));
  };


  // Adicione a função handleTextareaChange abaixo do bloco renderStars para atualizar o estado feedbackText
  const handleTextareaChange = (e) => {
    setFeedbackText(e.target.value);
  };

  // Adicione a função getCharacterCountClass abaixo do bloco handleTextareaChange para definir a classe do contador de caracteres
  const getCharacterCountClass = () => {
    return maxLength - feedbackText.length <= 10 ? 'character-count warning' : 'character-count';
  };

  return (
    <section className="feedback-section">
      <h2>
        O que estão <b>achando do café</b>
      </h2>
      <Swiper
        modules={[EffectCoverflow]}
        effect="coverflow"
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 50,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        className="feedback-swiper"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="testimonial">
              <img className="profile-image" src={testimonial.image} alt="Imagem de perfil" />
              <div className="testimonial-content">
                <p className="testimonial-name">- {testimonial.name}</p>
                <div className="testimonial-rating">{renderStars(testimonial.rating)}</div>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <form className="feedback-form">
        <div className="form-header">
          <h4>
            Deixe seu <b>feedback</b>
          </h4>
          <InputTextarea
            autoResize
            placeholder="Deixe seu feedback"
            maxLength={maxLength}
            value={feedbackText}
            onChange={handleTextareaChange}
          ></InputTextarea>
          <p className={getCharacterCountClass()}>
            {feedbackText.length}/{maxLength}
          </p>
          <button>Enviar</button>
        </div>
      </form>
    </section>
  );
}

export default FeedbackSection;
