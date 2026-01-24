import React, { useEffect, useRef, useState } from 'react';
import { animate, inView } from 'motion';
import { motion, useInView } from 'motion/react';
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

const t = { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] };
const itemFromLeft = { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0, transition: t } };
const itemFromRight = { hidden: { opacity: 0, x: 28 }, visible: { opacity: 1, x: 0, transition: t } };
const itemUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: t } };

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
  const breadcrumbsRef = useRef(null);
  const heroRef = useRef(null);
  const listRef = useRef(null);
  const testimonialsRef = useRef(null);
  const isBreadcrumbsInView = useInView(breadcrumbsRef, { once: true, amount: 0.3 });
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.12 });
  const isListInView = useInView(listRef, { once: true, amount: 0.1 });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.1 });

  return (
    <div className="clients-page">
      <StickyHeader />

      <motion.div
        ref={breadcrumbsRef}
        className="clients-breadcrumbs"
        initial="hidden"
        animate={isBreadcrumbsInView ? 'visible' : 'hidden'}
        variants={itemUp}
      >
        <div className="clients-breadcrumbs__container">
          <Breadcrumbs />
        </div>
      </motion.div>

      <section ref={heroRef} className="clients-hero">
        <motion.div
          className="clients-hero__container"
          initial="hidden"
          animate={isHeroInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
        >
          <motion.div
            className="clients-hero__content"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0 } } }}
          >
            <motion.div className="clients-hero__eyebrow" variants={itemFromLeft}>{hero.eyebrow}</motion.div>
            <motion.h1 className="clients-hero__title" variants={itemFromLeft}>{hero.title}</motion.h1>
            <motion.p className="clients-hero__subtitle" variants={itemFromLeft}>{hero.subtitle}</motion.p>
            <motion.div
              className="clients-hero__stats"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0 } } }}
            >
              {hero.stats.map((item) => (
                <motion.div key={item.label} className="clients-hero__stat" variants={itemUp}>
                  <AnimatedCounter value={item.value} />
                  <div className="clients-hero__stat-label">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="clients-hero__card" variants={itemFromRight}>
            <img src={hero.card.logo} alt="Impera Design" className="clients-hero__logo" />
            <div className="clients-hero__card-text">
              <p>{hero.card.text}</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section ref={listRef} className="clients-list">
        <motion.div
          className="clients-list__header"
          initial="hidden"
          animate={isListInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
        >
          <div>
            <motion.h2 className="clients-list__title" variants={itemUp}>{clients.title}</motion.h2>
            <motion.p className="clients-list__subtitle" variants={itemUp}>{clients.subtitle}</motion.p>
          </div>
        </motion.div>

        {/* Desktop carousel */}
        <motion.div
          className="clients-list__slider-wrapper clients-list__desktop"
          initial="hidden"
          animate={isListInView ? 'visible' : 'hidden'}
          variants={itemUp}
        >
          <button className="clients-list__nav clients-list__nav--prev" aria-label="Предыдущие клиенты">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="clients-list__container">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              slidesPerView={4}
              navigation={{
                prevEl: '.clients-list__nav--prev',
                nextEl: '.clients-list__nav--next',
              }}
              loop
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              className="clients-list__swiper"
            >
              {clients.list.map((client, index) => (
                <SwiperSlide key={`${client.name}-${index}`}>
                  <article className="clients-list__card">
                    <div className="clients-list__logo-box">
                      <img src={client.logo} alt={client.name} className="clients-list__logo" />
                    </div>
                    <div className="clients-list__info">
                      <h3 className="clients-list__name">{client.name}</h3>
                      {client.focus && <p className="clients-list__focus">{client.focus}</p>}
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button className="clients-list__nav clients-list__nav--next" aria-label="Следующие клиенты">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </motion.div>

        {/* Mobile grid */}
        <motion.div
          className="clients-list__grid clients-list__mobile"
          initial="hidden"
          animate={isListInView ? 'visible' : 'hidden'}
          variants={itemUp}
        >
          {clients.list.slice(0, 6).map((client, index) => (
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
        </motion.div>
      </section>

      <section ref={testimonialsRef} className="clients-testimonials">
        <motion.div
          className="clients-testimonials__header"
          initial="hidden"
          animate={isTestimonialsInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
        >
          <div>
            <motion.h2 className="clients-testimonials__title" variants={itemUp}>{testimonials.title}</motion.h2>
            <motion.p className="clients-testimonials__subtitle" variants={itemUp}>{testimonials.subtitle}</motion.p>
          </div>
        </motion.div>

        <motion.div
          className="clients-testimonials__slider-wrapper"
          initial="hidden"
          animate={isTestimonialsInView ? 'visible' : 'hidden'}
          variants={itemUp}
        >
          <button className="clients-testimonials__nav clients-testimonials__nav--prev" aria-label="Предыдущий отзыв">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="clients-testimonials__container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={3}
              navigation={{
                prevEl: '.clients-testimonials__nav--prev',
                nextEl: '.clients-testimonials__nav--next',
              }}
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
          </div>

          <button className="clients-testimonials__nav clients-testimonials__nav--next" aria-label="Следующий отзыв">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

export default Clients;

