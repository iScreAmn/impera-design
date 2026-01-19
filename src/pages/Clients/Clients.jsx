import React, { useEffect, useRef, useState } from 'react';
import { animate, inView } from 'motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import StickyHeader from '../../components/StickyHeader/StickyHeader';
import Breadcrumbs from '../../components/Widgets/Breadcrumbs/Breadcrumbs';
import Footer from '../../components/Footer/Footer';
import { clientsData } from '../../data/clientsData';
import './Clients.css';

const AnimatedCounter = ({ value }) => {
  const [current, setCurrent] = useState(0);
  const nodeRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!nodeRef.current) return;

    const stop = inView(
      nodeRef.current,
      () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        // Извлекаем число из строки
        const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;

        const controls = animate(0, numericValue, {
          duration: 1.6,
          onUpdate: (v) => setCurrent(Math.round(v))
        });

        return () => controls.stop();
      },
      { amount: 0.6 }
    );

    return () => stop();
  }, [value]);

  // Определяем префикс и суффикс из исходного значения
  const hasPrefix = value.includes('до');
  let suffix = '';
  if (value.includes('+')) suffix = '+';
  else if (value.includes('%')) suffix = '%';
  else if (value.includes('м²')) suffix = ' м²';

  return (
    <div ref={nodeRef} className="clients-hero__stat-value">
      {hasPrefix && 'до '}
      {current}
      {suffix}
    </div>
  );
};

function Clients() {
  const { hero, clients, testimonials } = clientsData;

  return (
    <div className="clients-page">
      <StickyHeader />

      <div className="clients-breadcrumbs">
        <div className="clients-breadcrumbs__container">
          <Breadcrumbs />
        </div>
      </div>

      <section className="clients-hero">
        <div className="clients-hero__container">
          <div className="clients-hero__content">
            <div className="clients-hero__eyebrow">{hero.eyebrow}</div>
            <h1 className="clients-hero__title">{hero.title}</h1>
            <p className="clients-hero__subtitle">{hero.subtitle}</p>
            <div className="clients-hero__stats">
              {hero.stats.map((item) => (
                <div key={item.label} className="clients-hero__stat">
                  <AnimatedCounter value={item.value} />
                  <div className="clients-hero__stat-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="clients-hero__card">
            <img src={hero.card.logo} alt="Impera Design" className="clients-hero__logo" />
            <div className="clients-hero__card-text">
              <p>{hero.card.text}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="clients-list">
        <div className="clients-list__header">
          <div>
            <h2 className="clients-list__title">{clients.title}</h2>
            <p className="clients-list__subtitle">{clients.subtitle}</p>
          </div>
        </div>

        <div className="clients-list__marquee">
          <div className="clients-list__fade clients-list__fade--left" aria-hidden />
          <div className="clients-list__fade clients-list__fade--right" aria-hidden />
          <div className="clients-list__track">
            {[...clients.list, ...clients.list].map((client, index) => (
              <article key={`${client.name}-${index}`} className="clients-list__card">
                <div className="clients-list__logo-box">
                  <img src={client.logo} alt={client.name} className="clients-list__logo" />
                </div>
                <div className="clients-list__info">
                  <h3 className="clients-list__name">{client.name}</h3>
                  {client.focus && <p className="clients-list__focus">{client.focus}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="clients-testimonials">
        <div className="clients-testimonials__header">
          <div>
            <h2 className="clients-testimonials__title">{testimonials.title}</h2>
            <p className="clients-testimonials__subtitle">{testimonials.subtitle}</p>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          centeredSlides
          loop
          loopAdditionalSlides={2}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="clients-testimonials__swiper"
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20, centeredSlides: false, loop: true },
            768: { slidesPerView: 2, spaceBetween: 24, centeredSlides: true, loop: true },
          }}
        >
          {testimonials.list.map((item) => (
            <SwiperSlide key={item.id}>
              <article className="clients-testimonials__card">
                <div className="clients-testimonials__quote">«{item.text}»</div>
                <div className="clients-testimonials__author">
                  {item.name && <div className="clients-testimonials__name">{item.name}</div>}
                  {item.company && <div className="clients-testimonials__company">{item.company}</div>}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <Footer />
    </div>
  );
}

export default Clients;

